import React, { Component } from 'react'
import { withRouter } from 'react-router'

import MatchBlock from './MatchBlock'

class Matches extends Component {
	state = {
		matches: [
			{
				id: 0,
				type: 'LOL',
				teams: ['IG', 'TPA'],
				status: 'Ready'
			},
			{
				id: 1,
				type: 'LOL',
				teams: ['RNG', 'EDG'],
				status: 'Ready'
			},
			{
				id: 2, 
				type: 'NBA',
				teams: ['Warriors', 'Raptors'],
				status: 'Ongoing'
			},
			{
				id: 3,
				type: 'HeartStone',
				teams: ['tom60229', 'Roger'],
				status: 'End'
			}
		]
	}
	fetchAndProcess = async() => {
		var response = await fetch('/matches_data')
		var all_matches = await response.json()
		var matches = []
		for (let i = 0; i < all_matches.length; ++i) {
			switch(this.props.progress) {
				case 'hold':
					if (!this.props.held.includes(i) && all_matches[i].status === 'Ready')
						matches.push(all_matches[i])
					break
				case 'bet':
					if (this.props.held.includes(i) && all_matches[i].status === 'Ready')
						matches.push(all_matches[i])
					break
				case 'observe':
					if (this.props.held.includes(i) && all_matches[i].status === 'Ongoing')
						matches.push(all_matches[i])
					break
				case 'result':
					if (this.props.held.includes(i) && all_matches[i].status === 'End')
						matches.push(all_matches[i])
					break
				default:
					break
			}
		}
		console.log(matches)
		this.setState( () => ({ matches: matches }))
	}
	componentDidMount = () => {
		this.fetchAndProcess()
	}
	componentDidUpdate = (prevProps, prevState) => {
		if (this.props !== prevProps)
			this.fetchAndProcess()
	}
	chooseMatch = matchId => {
		var url = '/matches/' + matchId
		this.props.history.push(url)
	}
	render() {
		var matches = this.state.matches.map((content) => (
			<MatchBlock onClick={()=>this.chooseMatch(content.id)}
									type={content.type}
									teams={content.teams} 
									key={content.id}/>
		))
		return(
			<div className='font-sec fl-col align-center'>
				{matches}
			</div>
		)
	}
}

export default withRouter(Matches)

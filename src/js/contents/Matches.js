import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Matches extends Component {
	state = {
		matches: []
	}
	componentDidMount = async() => {
		var response = await fetch('/matches_data')
		var matches = await response.json()
		this.setState( () => ({ matches: matches }))
	}
	/*
	addMatch = async() => {
		var data = {
			id: this.state.matches.length,
			type: "LoL",
			teams: [
				"IG",
				"TPA"
			],
			scores: [
				0,
				0
			],
			start: Data.now(),
			end: 0,
			result: -1,
			status: "Ongoing"
		}
		var response = await fetch('/add_match', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		this.setState( (state) => ({matches: [...state.matches, data]}))
	}
	*/
	chooseMatch = matchId => {
		var url = '/matches/' + matchId
		this.props.history.push(url)
	}
	render() {
		var matches = this.state.matches.map((content, idx) => (
			<h2 className='cursor-point'
					onClick={()=>this.chooseMatch(idx)}>
						{content.type + '    ' + content.teams[0] + ' vs. ' + content.teams[1]}
			</h2>)
		)
		return(
			<div className='font-sec fl-col align-center'>
				{matches}
			</div>
		)
	}
}

export default withRouter(Matches)

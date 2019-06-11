import React, { Component } from 'react'
import { withRouter } from 'react-router'
import * as Contract from '../api'

class Match extends Component {
	state = {
		id: this.props.match.params.matchId,
		type: '',
		teams: ['', ''],
		scores: [0, 0],
		start: 0,
		end: 0,
		result: -1,
		status: ''
	}
	componentDidMount = async() => {
		var response = await fetch('/matches_data/' + this.state.id)
		var data = await response.json()
		this.setState( () => (data))

		this.refreshData = setInterval( async() => {
			response = await fetch('/scores?id=' + this.state.id)
			var scores = await response.json()
			this.setState( () => ({ scores: scores }))
		}, 1000)
	}
	componentWillUnmount = () => {
		clearInterval(this.refreshData)
	}
	bet = teamId => {
		Contract.bet(this.state.id, this.betAmount.value, teamId+1)
	}
	render() {
		return (
			<div>
				<div className='font-num fl-col align-center'>
					<div>
						<h2>{this.state.type}</h2>
					</div>
					<div className='fl-row'>
						<h1 className='pd-0-20'>{this.state.teams[0]}</h1>
						<h1 className='pd-0-20'>{this.state.teams[1]}</h1>
					</div>
					<div className='fl-row'>
						<h1 className='pd-0-20'>{this.state.scores[0]}</h1>
						<h1>:</h1>
						<h1 className='pd-0-20'>{this.state.scores[1]}</h1>
					</div>
					<div className='fl-col'>
						<div className='fl-row'>
							<input type='text' placeholder='BetAmount' ref={el=>this.betAmount=el} />
						</div>
						<div className='fl-row'>
							<button className='pd-0-20' onClick={()=>this.bet(0)}>{'bet '+this.state.teams[0]}</button>
							<button className='pd-0-20' onClick={()=>this.bet(1)}>{'bet '+this.state.teams[1]}</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Match)

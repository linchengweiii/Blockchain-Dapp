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
		status: '',

		value: ['', '']
	}
	componentDidMount = async() => {
		var response = await fetch('/matches_data/' + this.state.id)
		var data = await response.json()
		this.setState( () => (data))

		this.refreshData = setInterval( async() => {
			response = await fetch('/status?id=' + this.state.id)
			var status = await response.json()
			if (status === 'Ongoing'){
				response = await fetch('/scores?id=' + this.state.id)
				var scores = await response.json()
				this.setState( () => ({ scores: scores }))
			}else if (status === 'End') {
				response = await fetch('/result?id=' + this.state.id)
				var result = await response.json()
				this.setState( () => ({ result: result }))

				response = await fetch('/scores?id=' + this.state.id)
				var scores = await response.json()
				this.setState( () => ({ scores: scores }))

				var res = await fetch('/held')
				var gameId2matchId = await res.json()
				var gameId;
				for (var k in gameId2matchId){
					if (gameId2matchId[k] == this.state.id){
						gameId = k;
						console.log(k)
						break;
					}
				}

				Contract.payback(gameId, result+1, scores[0], scores[1])

				clearInterval(this.refreshData)
			}
			if ( this.state.status !== status )
				this.setState( () => ({ status: status }))
		}, 1000)
	}
	componentWillUnmount = () => {
		clearInterval(this.refreshData)
	}
	handleInput = (e, teamId) => {
		const regex = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/

		if (e.target.value === '' || regex.test(e.target.value)){
			var value = this.state.value
			value[teamId] = e.target.value
			this.setState(() => ({ value: value }))
		}
	}
	handleKeyDown = (e, teamId) => {
		// keycode for enter == 13
		if (e.keyCode === 13){
			this.bet(teamId)
			var value = this.state.value
			value[teamId] = ''
			this.setState( () => ({ value: value }))
		}
	}
	bet = async (teamId) => {
		var betAmount = parseFloat(this.state.value[teamId])
		var res = await fetch('/held')
		var gameId2matchId = await res.json()
		var gameId;
		for (var k in gameId2matchId){
			if (gameId2matchId[k] == this.state.id){
				console.log(k)
				gameId = k;
				break;
			}
		}
		Contract.bet(gameId, betAmount, teamId+1)
	}
	render() {
		var content
		var bet = []
		for (let i = 0; i < 2; ++i) {
			bet.push(
				<input className='mr-0-20 pd-10-30 fl-1-1 h-30' 
							 placeholder='BET'
							 value={this.state.value[i]}
							 key={i}
							 onKeyDown={e => this.handleKeyDown(e, i)}
							 onChange={e => this.handleInput(e, i)}/>
			)
		}
		switch(this.state.status) {
			case 'Ready':
				content = (
					<div className='fl-row w-600'>
						{bet}
					</div>
				)
				break
			case 'Ongoing':
			case 'End':
				content = (
					<div className='fl-row w-600'>
						<h1 className='pd-0-20 w-300 fl-1-1 t-center'>{this.state.scores[0]}</h1>
						<h1 className='pd-0-20 w-300 fl-1-1 t-center'>{this.state.scores[1]}</h1>
					</div>
				)
				break
			default:
				break
		}
		return (
			<div>
				<div className='font-num fl-col align-center'>
					<div>
						<h1>{this.state.type}</h1>
					</div>
					<div className='fl-row w-600'>
						<h2 className='pd-0-20 w-300 fl-1-1 t-center'>{this.state.teams[0]}</h2>
						<h2 className='pd-0-20 w-300 fl-1-1 t-center'>{this.state.teams[1]}</h2>
					</div>
					{content}
				</div>
			</div>
		)
	}
}

export default withRouter(Match)

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
	addMatch = async() => {
		var data = {id: 2}
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
	chooseMatch = matchId => {
		var url = '/matches/' + matchId
		this.props.history.push(url)
	}
	render() {
		var matches = this.state.matches.map((content, idx) => (
			<h2 className='cursor-point'
					onClick={()=>this.chooseMatch(idx)}>
						{content.id}
			</h2>)
		)
		return(
			<div className='washed-blue'>
				<h2>Matches</h2>
				{matches}
				<button onClick={this.addMatch}>Add</button>
			</div>
		)
	}
}

export default withRouter(Matches)

import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Match extends Component {
	state = {
		id: this.props.match.params.matchId,
		contestantA: 0,
		contestantB: 0,
	}
	componentDidMount = async() => {
		var response = await fetch('matches_data/' + this.state.id)
		var data = await response.json()
		this.setState( () => (data))
	}
	render() {
		return (
			<div>
				<div className='font-num fl-center fl-row'>
					<h1 className='pd-0-20'>{this.state.contestantA}</h1>
					<h1>:</h1>
					<h1 className='pd-0-20'>{this.state.contestantB}</h1>
				</div>
			</div>
		)
	}
}

export default withRouter(Match)

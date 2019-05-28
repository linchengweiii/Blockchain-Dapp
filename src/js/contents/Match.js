import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Match extends Component {
	state = {
		id: this.props.match.params.matchId,
		contestantA: {name: 'A', point: 0},
		contestantB: {name: 'B', point: 0},
	}
	componentDidMount = async() => {
		var response = await fetch('matches_data/' + this.state.id)
		var data = await response.json()
		this.setState( () => (data))
	}
	render() {
		return (
			<div>
				<div className='font-num fl-col align-center'>
					<div className='fl-row'>
						<h1 className='pd-0-20'>{this.state.contestantA.name}</h1>
						<h1 className='pd-0-20'>{this.state.contestantB.name}</h1>
					</div>
					<div className='fl-row'>
						<h1 className='pd-0-20'>{this.state.contestantA.point}</h1>
						<h1>:</h1>
						<h1 className='pd-0-20'>{this.state.contestantB.point}</h1>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Match)

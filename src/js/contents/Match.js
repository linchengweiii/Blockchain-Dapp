import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Match extends Component {
	render() {
		return (
			<div>{this.props.match.params.matchId}</div>
		)
	}
}

export default withRouter(Match)

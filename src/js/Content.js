import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as Contract from './api'

import Home from './contents/Home'
import Matches from './contents/Matches'
import User from './contents/User'
import Login from './contents/Login'
import Match from './contents/Match'

class Content extends Component {
	state = {
		held: []
	}
	holdMatch = matchId => {
		Contract.holdNewLot(matchId)
		this.setState( prevState => ({ held: [...prevState.held, matchId] }))
	}
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/' render={() => <Home />} />
					<Route path='/holdable_matches' render={() => <Matches progress='hold' holdMatch={this.holdMatch} held={this.state.held}/>} />
					<Route path='/bettable_games' render={() => <Matches progress='bet' held={this.state.held}/>} />
					<Route path='/ongoing_games' render={() => <Matches progress='observe' held={this.state.held}/>} />
					<Route path='/ended_games' render={() => <Matches progress='result' held={this.state.held}/>} />
					<Route path='/matches/:matchId' render={() => <Match />} />
					<Route path='/user' render={() => <User />} />
					<Route path='/login' render={() => <Login login={this.props.login}/>} />
				</Switch>
			</div>
		)
	}
}

export default Content

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './contents/Home'
import Matches from './contents/Matches'
import User from './contents/User'
import Match from './contents/Match'

class Content extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path='/' render={() => <Home />} />
					<Route exact path='/matches' render={() => <Matches />} />
					<Route path='/matches/:matchId' render={() => <Match />} />
					<Route path='/user' render={() => <User />} />
				</Switch>
			</div>
		)
	}
}

export default Content

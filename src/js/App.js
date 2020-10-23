import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Header from './Header'
import Content from './Content'
import * as Contract from './api'

let web3js = window.web3js;

class App extends Component {
	state = {
		cur_page: 0,
		isLoggedIn: false,
		userId: '',
		contents: [
			{ url: '/'										, text: 'Home' },
			{ url: '/holdable_matches'		, text: 'Holdable Matches' },
			{ url: '/bettable_games'			, text: 'Bettable Games' },
			{ url: '/ongoing_games'				, text: 'Ongoing Games' },
			{ url: '/ended_games'					, text: 'Ended Games' },
			//{ url: '/login'								, text: 'Login' },
		]
	}
	componentDidMount(){
		Contract.load();
		console.log("lotteryContract");
		console.log(Contract.lotteryContract);
	}
	login = userId => {
		this.setState( () => ({ isLoggedIn: true }))
		this.setState( (state) => {
			var new_contents = state.contents
			new_contents[new_contents.length-1] = { url: '/user', text: 'User' }
			return { contents: new_contents }
		})
		this.props.history.push('/')
		this.setState( () => ({ userId: userId }))
	}
	changePage = idx => {
		this.setState( () => ({ cur_page: idx }))
		this.props.history.push(this.state.contents[idx].url)
	}
	render() {
		return (
			<div>
				<Header changePage={this.changePage}
								cur_page={this.state.cur_page}
								contents={this.state.contents} />
				<Content login={this.login}/>
			</div>
		)
	}
}

export default withRouter(App)

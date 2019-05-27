import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Header from './Header'
import Content from './Content'

class App extends Component {
	state = {
		cur_page: 0,
		contents: [
			{ url: '/'				, text: 'Home' },
			{ url: '/matches'	, text: 'Matches' },
			{ url: '/user'		, text: 'User' },
		]
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
				<Content />
			</div>
		)
	}
}

export default withRouter(App)

import React, { Component } from 'react'
import HomepageBlock from './HomepageBlock'

class Home extends Component {
	state = {
		texts: [
			{
				title: 'Hold A Game',
				subtitle: 'You can hold any lottery for the official games. Of course without any benefits.',
				button: 'Go Hold',
				url: '/holdable_matches'
			},
			{
				title: 'Bet Some Games',
				subtitle: 'Be safe to bet on our platform due to our Blockchain backend.',
				button: 'Go Bet',
				url: '/bettable_games'
			},
			{
				title: 'Observe Games',
				subtitle: 'Observe those games you bet to make yourself nervous.',
				button: 'Go Observe',
				url: '/ongoing_games'
			},
			{
				title: 'Watch The Results',
				subtitle: 'Check whether you won the lottery or not',
				button: 'Go Watch',
				url: '/ended_games'
			}
		]
	}
	render() {
		var contents = this.state.texts.map((content, idx) => (
			<HomepageBlock title={content.title}
										 subtitle={content.subtitle}
										 button={content.button}
										 url={content.url}
										 sec={(idx%2 > 0)? true: false}
										 key={idx}/>
		))
		return(
			<div>
				<MainBlock />
				<SubBlock />
				{contents}
			</div>
		)
	}
}

class MainBlock extends Component {
	render() {
		return (
			<div className='h-300 fl-col fl-center'>
				<h1 className='mr-0-100 pd-10-0 dark-green'>Blockchain-Dapp</h1>
				<h2 className='mr-0-100 pd-10-0 disat-green'>Let's play lottery together!</h2>
			</div>
		)
	}
}

class SubBlock extends Component {
	render() {
		return (
			<div className='h-250 fl-col align-center bg-light-green'>
				<h1 className='dark-green'>Why Blockchain?</h1>
				<h2 className='mr-5-0 disat-green'>Via the help of blockchain, it's much more safer to bet on our platform.</h2>
				<h2 className='mr-5-0 disat-green'>Get away from the fear of being hacked and start play lotteries!</h2>
			</div>
		)
	}
}

export default Home

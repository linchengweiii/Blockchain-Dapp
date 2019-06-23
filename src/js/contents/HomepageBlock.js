import React, { Component } from 'react'
import { withRouter } from 'react-router'
import AnimateButton from './AnimateButton'

class HomepageBlock extends Component {
	changepage = () => {
		this.props.history.push(this.props.url)
	}
	render() {
		var style = 'h-250 fl-row'
		if (this.props.sec)
			style += ' bg-light-green'
		return (
			<div className={style}>
				<div className='w-800 fl-col fl-center fl-1-1'>
					<h1 className='f2 mr-0-100 pd-10-0 dark-green'>{this.props.title}</h1>
					<h2 className='f4 mr-0-100 pd-10-0 disat-green'>{this.props.subtitle}</h2>
				</div>
				<div className='w-300 fl-1-1 fl-col fl-center align-center'>
					<AnimateButton text={this.props.button} onClick={this.changepage}/>
				</div>
			</div>
		)
	}
}

export default withRouter(HomepageBlock)

import React, { Component } from 'react'

class MatchBlock extends Component {
	render() {
		return (
			<div className='mr-0-50 pd-0-40 fl-row fl-center align-center cursor-point hv-bg-light-grey' onClick={this.props.onClick}>
				<h1 className='w-300'>{this.props.type}</h1>
				<div className='fl-row w-500'>
					<h2>{this.props.teams[0]}</h2>
					<h2 className='pd-0-10'>vs.</h2>
					<h2>{this.props.teams[1]}</h2>
				</div>
			</div>
		)
	}
}

export default MatchBlock

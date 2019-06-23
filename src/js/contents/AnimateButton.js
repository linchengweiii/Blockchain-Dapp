import React, { Component } from 'react'

class AnimateButton extends Component {
	render() {
		return (
			<button className='h-50 w-200 button-up f-14 bg-green dark-green' onClick={this.props.onClick}>{this.props.text}</button>
		)
	}
}

export default AnimateButton

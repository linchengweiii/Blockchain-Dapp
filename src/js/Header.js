import React, { Component } from 'react'

class Header extends Component {
	changePage = idx => {
		this.props.changePage(idx)
	}
	render() {
		const headers = this.props.contents.map( (content,idx) => 
			<h2
				className='pd-0-10 font-pri cursor-point'
				onClick={() => this.changePage(idx)}
				key={idx}>
					{content.text}
			</h2>
		)
		return (
			<div className='fl-row fl-center'>
				{headers}
			</div>
		)
	}
}

export default Header

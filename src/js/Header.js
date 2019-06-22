import React, { Component } from 'react'
import Logo from './logo.svg'

class Header extends Component {
	changePage = idx => {
		this.props.changePage(idx)
	}
	render() {
		var headers = []
		for (let i = 1; i < this.props.contents.length; ++i) {
			headers.push(<h2 className='pd-0-20 font-pri cursor-point'
											onClick={() => this.changePage(i)}
											key={i}>
											{this.props.contents[i].text}
									</h2>)
		}
		return (
			<div className='fl-row fl-center bg-light-green'>
				<img className='mr-15-0 pd-0-20 cursor-point' src={Logo} alt='Logo' onClick={() => this.changePage(0)} height='32px'/>
				{headers}
			</div>
		)
	}
}

export default Header

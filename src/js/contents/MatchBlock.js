import React, { Component } from 'react'

class MatchBlock extends Component {
	constructor(props) {
		super(props)
		this.rect = React.createRef()
		this.state = {
			isHovered: false
		}
	}
	componentWillUnmount = () => {
		if (this.state.isHovered)
			this.removeMouseMoveHandler()
	}
	addMouseMoveHandler = () => {
		window.addEventListener('mousemove', this.handleMouseMove)
	}
	removeMouseMoveHandler = () => {
		window.removeEventListener('mousemove', this.handleMouseMove)
	}
	handleMouseMove = e => {
		const rect = this.rect.current.getBoundingClientRect()

		if( e.clientX < rect.left || e.clientX > rect.right ||
				e.clientY < rect.top || e.clientY > rect.bottom ) {
			this.setState( () => ({ isHovered: false }))
			this.removeMouseMoveHandler()
		}
	}
	mouseover = e => {
		this.setState( () => ({ isHovered: true }))
		this.addMouseMoveHandler()
	}
	mouseout = e => {
		this.setState( () => ({ isHovered: false }))
		this.removeMouseMoveHandler()
	}
	handleOnClick = () => {
		switch(this.props.progress) {
			case 'hold':
				this.props.holdMatch()
				break
			case 'bet':
			case 'observe':
			case 'result':
				this.props.chooseMatch()
				break
			default:
				break
		}
	}
	render() {
		var content = []
		if (this.state.isHovered) {
			switch(this.props.progress) {
				case 'hold':
					content.push(<h1 key='hold'>Hold</h1>)
					break
				case 'bet':
					content.push(<h1 key='bet'>Bet</h1>)
					break
				case 'observe':
					content.push(<h1 key='observe'>Observe</h1>)
					break
				case 'result':
					content.push(<h1 key='result'>Result</h1>)
					break
				default:
					break
			}
		}else {
			content.push(<h1 className='w-300' key='type'>{this.props.type}</h1>)
			content.push(
				<div className='fl-row w-500' key='teams'>
					<h2>{this.props.teams[0]}</h2>
					<h2 className='pd-0-10'>vs.</h2>
					<h2>{this.props.teams[1]}</h2>
				</div>
			)
		}
		return (
			<div className='mr-5-0 pd-0-40 w-800 h-80 fl-row fl-center align-center cursor-point hv-bg-green radius-20' 
					 onClick={this.handleOnClick}
					 onMouseEnter={this.mouseover}
					 onMouseLeave={this.mouseout}
					 ref={this.rect}>
				{content}
			</div>
		)
	}
}

export default MatchBlock

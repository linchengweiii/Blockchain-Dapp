import React, { Component } from 'react'

class Login extends Component {
	login = async(e) => {
		e.preventDefault() // avoid default page refreshing
		var url = '/login?account='+this.account.value+'&password='+this.password.value
		var response = await fetch(url)
		var userInfo = await response.json()
		this.props.login(userInfo)
	}
	render() {
		return(
			<form className='fl-col align-center' onSubmit={this.login}>
				<input className='mr-10' type='text' placeholder='Account' ref={el => this.account=el} />
				<input className='mr-10' type='text' placeholder='Password' ref={el => this.password=el} />
				<input className='mr-10' type="submit" value="Submit" />
			</form>
		)
	}
}

export default Login

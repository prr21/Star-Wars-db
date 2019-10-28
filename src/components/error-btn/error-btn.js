import React, { Component } from 'react'
import './error-btn.css'

export default class ErrorBtn extends Component {
	state = {
		throwError: false
	}

	render(){

		if (this.state.throwError) {
			return this.foo.bar = NaN
		}
		return(
			<button className="btn btn-lg btn-danger"
			onClick={ () => this.setState({throwError: true}) }>
				Destroy this
			</button>
		)
	}
}
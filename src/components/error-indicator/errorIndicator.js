import React from 'react'
import './errorIndicator.css'
import deathStar from './death-star.png'

const ErrorIndicator = () => {
	return (
		<div className="error-wrap">
			<img src={deathStar} alt="death-star error"/>
			<span>Something Gone Wrong!</span>
			<span>Sorry about that</span>
		</div>
	)
}

export default ErrorIndicator
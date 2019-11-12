import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLogged }) => {
	if (isLogged) {
		return (
			<div className='text-center mt-4 p-4 bg-success'>
				<h2>Hi there!</h2>
				<p>This page full of secrets! Dont tell about it to somebody...</p>
			</div>
		)
	}
	return (
		<Redirect to='/login'/>
	)
}

export default SecretPage
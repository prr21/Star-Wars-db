import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ isLogged, login }) => {
	if (isLogged) {
		return <Redirect to="/"/>;
	}
	return (
		<div className='text-center mt-4'>
			<p className='text-warning'>You've got to login to see a secret page!</p>
			<button 
				className='btn btn-md btn-primary'
				onClick={ login }>
				Login
			</button>
		</div>
	)
}

export default LoginPage
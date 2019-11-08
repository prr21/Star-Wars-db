import React from 'react';
import { SwapiConsumer } from '../swapi-service-context';

const withSwapi = (Wrapped, mapMethodsToProps) => {
	return(props) => {
	  	return (
	  		<SwapiConsumer>
	  		{
	            (swapiResorse) => {
	            	const serviceProps = mapMethodsToProps(swapiResorse)

	                return (
	                	<Wrapped {...props} {...serviceProps}/>
	                )
	            }
	        }
	        </SwapiConsumer>
    	)
    }
}

export default withSwapi
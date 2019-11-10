import React from 'react';

import ItemDetails, {Record} from '../item-details';
import { withSwapi } from '../hoc-helper';

const StarshipDetails =	(props) => {
	return (
		<ItemDetails {...props}>
	        <Record field="model" label="Model" />
	        <Record field="length" label="Length" />
	        <Record field="cost_in_credits" label="Cost" />
	    </ItemDetails>
	);
}

const mapMethodsToProps = (swapi) => {
	return {
		getData: swapi.getStarship,
		getImageUrl: swapi.getImageStarship
	}
}

export default withSwapi(mapMethodsToProps)(StarshipDetails)
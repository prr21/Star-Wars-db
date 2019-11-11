import React, { Component } from 'react';
import Row from '../row';
import { PlanetList, PlanetDetails } from '../sw-components';

export default class PlanetPage extends Component {

	state = {
		itemId: null
	}

	selectedItem = (itemId) => {
		this.setState({
			itemId
		})
	}

	render(){
		const { itemId } = this.state

	    return (
	    	<Row 
	            firstWidget = { <PlanetList selectedItem={this.selectedItem}/> } 
	            secondWidget = { <PlanetDetails itemId={itemId} /> }
	        />
	    )
	}
}
import React, { Component } from 'react'
import Row from '../row';
import ItemList from '../item-list';
import ErrorBoundary from '../error-boundary';
import ItemDetails, { Record } from '../item-details';

import SwapiResorse from '../../services/swapi-services';
import './page-person.css'

export default class PagePerson extends Component {

	state = {
		selectedPerson: null,
		hasError: false
	}

	swapiResorse = new SwapiResorse()

	onPersonSelected = (selectedPerson) => {
		this.setState({ selectedPerson });
	};
	
	render(){
		const itemList = (
			<ItemList 
				onSelectedItem={this.onPersonSelected} 
				getData={this.swapiResorse.getAllPeople}>
					{ 
						(i) => `${i.name} (${i.gender})` 
					}

			</ItemList>
		)

		const itemDetails = (
			<ItemDetails 
				itemId={this.state.selectedPerson}
				getItem={ this.swapiResorse.getPerson }
				getImageUrl={this.swapiResorse.getImagePerson}>
					<Record field={'gender'} label={'Gender'} />
					<Record field={'birthYear'} label={'Birth Year'} />
					<Record field={'eyeColor'} label={'Eye Color'} />
			</ItemDetails>
		)

		return (
			<ErrorBoundary>
				<Row firstWidget={itemList} secondWidget={itemDetails}/>
			</ErrorBoundary>
		)

	}
}
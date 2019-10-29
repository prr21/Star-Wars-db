import React, { Component } from 'react'
import Row from '../row';
import ItemList from '../item-list';
import ErrorBoundary from '../error-boundary';
import PersonDetails from '../person-details';

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
			<ItemList onSelectedItem={this.onPersonSelected} 
				getData={this.swapiResorse.getAllPeople}>
				{
					(i) => `${i.name} (${i.gender})` 
				}
			</ItemList>
		)

		const personDetails = (
			<PersonDetails personId={this.state.selectedPerson}/>
		)

		return (
			<ErrorBoundary>
				<Row firstWidget={itemList} secondWidget={personDetails}/>
			</ErrorBoundary>
		)

	}
}
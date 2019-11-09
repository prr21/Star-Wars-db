import React, { Component } from 'react';
import Row from '../row';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import ErrorBtn from '../error-btn';

import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components';

import { SwapiProvider } from '../swapi-service-context'
import SwapiResorse from '../../services/swapi-services';
import TestResorse from '../../services/dummy-swapi-service';
import './app.css';

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        personId: null,
        planetId: null,
        starshipId: null,
        swapiResorse: new SwapiResorse()
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    onToggleData = () => {
        this.setState(({ swapiResorse }) => {

            const apiResorse = swapiResorse instanceof TestResorse
                                ? SwapiResorse : TestResorse

            return {
                swapiResorse: new apiResorse()
            }
        }) 
    }

    onSelectedPerson = (itemId) => {
        this.setState({
            personId:itemId
        })
    }

    onSelectedPlanet = (itemId) => {
        this.setState({
            planetId:itemId
        })
    }

    onSelectedStarship = (itemId) => {
        this.setState({
            starshipId:itemId
        })
    }

    render(){

        const { personId, planetId, starshipId, 
                showRandomPlanet, swapiResorse } = this.state

        const planet = showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <ErrorBoundary>
              <SwapiProvider value={swapiResorse}>

                <Header onToggleData={this.onToggleData}/>

                { planet }

                <div className="row mb-2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorBtn />
                </div>

                <Row 
                    firstWidget = { 
                        <PersonList selectedItem={this.onSelectedPerson}/> }
                    secondWidget = {
                        <PersonDetails itemId={personId}/> }
                />
                <Row 
                    firstWidget = {
                        <PlanetList selectedItem={this.onSelectedPlanet}/> 
                    } secondWidget = {
                        <PlanetDetails itemId={planetId}/> }
                />
                <Row
                    firstWidget = {
                        <StarshipList selectedItem={this.onSelectedStarship}/> 
                    } secondWidget = {
                        <StarshipDetails itemId={starshipId}/> }
                />

              </SwapiProvider>
            </ErrorBoundary>
        );
    }
};
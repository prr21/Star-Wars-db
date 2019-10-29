import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PagePerson from '../page-person';
import ErrorBoundary from '../error-boundary';
import ErrorBtn from '../error-btn';
import ItemList from '../item-list';

import SwapiResorse from '../../services/swapi-services';
import './app.css';

export default class App extends Component {

    state = {
        personId: null,
        planetId: null,
        shipId: null,
        showRandomPlanet: true,
    }

    swapiResorse = new SwapiResorse()

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    selectedItem = (personId) => {
        this.setState({
            personId
        })
    }

    render(){

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <ErrorBoundary>
                <Header />
                { planet }

                <div className="row mb-2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorBtn />
                </div>

                <PagePerson />

                {/*<div className="row mb-4">
                    <div className="col-md-6">
                        <ItemList onSelectedItem={this.onPersonSelected}
                            getData={this.swapiResorse.getAllPlanets}
                            renderItem={({name, diameter, climate}) => `${name} (${diameter}, ${climate})`}
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <ItemList onSelectedItem={this.onPersonSelected}
                            getData={this.swapiResorse.getAllStarships}
                            renderItem={({name, model}) => `${name} (${model})`}
                        />
                    </div>
                </div>*/}
            </ErrorBoundary>
        );
    }
};
import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorBtn from '../error-btn';
import ErrorIndicator from '../error-indicator';
import SwapiResorse from '../../services/swapi-services';

import './app.css';

export default class App extends Component {
    swapiResorse = new SwapiResorse()

    state = {
        personId: null,
        planetId: null,
        shipId: null,
        showRandomPlanet: true,
        hasError: false
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    componentDidCatch(){
        console.log('Error')
        this.setState({hasError:true})
    }

    selectedItem = (personId) => {
        this.setState({
            personId
        })
    }

    render(){
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;
            
        return (
            <div>
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

                <div className="row mb-4">
                    <div className="col-md-6">
                        <ItemList 
                            selectedItem={this.selectedItem}
                            getData={this.swapiResorse.getAllPeople}
                        />
                    </div>

                    <div className="col-md-6">
                        <PersonDetails personId={this.state.personId}/>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <ItemList 
                            selectedItem={this.selectedItem}
                            getData={this.swapiResorse.getAllPlanets}
                        />
                    </div>

                    <div className="col-md-6">
                        {2/*<PersonDetails planetId={this.state.planetId}/>*/}
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <ItemList 
                            selectedItem={this.selectedItem}
                            getData={this.swapiResorse.getAllStarships}
                        />
                    </div>

                    <div className="col-md-6">
                        {2/*<PersonDetails shipId={this.state.shipId}/>*/}
                    </div>
                </div>
            </div>
        );
    }
};
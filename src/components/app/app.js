import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import ErrorBtn from '../error-btn';

import {StarshipDetails}from "../sw-components";
import {
    PersonPage,
    PlanetPage,
    StarshipPage
} from '../pages'

import { SwapiProvider } from '../swapi-service-context'
import SwapiResorse from '../../services/swapi-services';
import TestResorse from '../../services/dummy-swapi-service';
import './app.css';

export default class App extends Component {

    state = {
        showRandomPlanet: true,
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

    render(){

        const { showRandomPlanet, swapiResorse } = this.state

        const planet = showRandomPlanet ?
            <RandomPlanet /> :
            null;

        return (
            <ErrorBoundary>
              <SwapiProvider value={swapiResorse}>
                <Router >

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
                    <Route path='/' exact render={ () => 
                        <h2 className='text-center mt-4'>Welcome To Star DB Application!</h2>
                    } />

                    <Route path='/people/:id?' component={ PersonPage } />
                    <Route path='/planets' component={ PlanetPage } />
                    <Route path='/starships' exact component={ StarshipPage } />

                    <Route path='/starships/:id' render={({ match }) => 
                        <StarshipDetails itemId={match.params.id} />
                    } />

                </Router>
              </SwapiProvider>
            </ErrorBoundary>
        );
    }
};
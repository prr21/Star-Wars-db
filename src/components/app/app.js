import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from '../error-boundary';
import ErrorBtn from '../error-btn';

import {StarshipDetails}from "../sw-components";
import {
    PersonPage,
    PlanetPage,
    StarshipPage,
    LoginPage,
    SecretPage
} from '../pages'

import { SwapiProvider } from '../swapi-service-context'
import SwapiResorse from '../../services/swapi-services';
import TestResorse from '../../services/dummy-swapi-service';
import './app.css';

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        swapiResorse: new SwapiResorse(),
        isLogged: false
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    onLogin = () => {
        this.setState({
            isLogged: true
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

        const { showRandomPlanet, swapiResorse, isLogged } = this.state

        const planet = showRandomPlanet ?
            <RandomPlanet /> :
            null;

        return (
            <ErrorBoundary>
              <SwapiProvider value={swapiResorse}>
                <Router>
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

                  <Switch>
                    <Route path='/' exact render={ () => 
                        <h2 className='text-center mt-4'>Welcome To Star DB Application!</h2>
                    } />

                    <Route path='/people/:id?' component={ PersonPage } />
                    <Route path='/planets' component={ PlanetPage } />
                    <Route path='/starships' exact component={ StarshipPage } />

                    <Route path='/login' exact render={ () =>
                        <LoginPage isLogged={isLogged} login={this.onLogin}/>
                    } />

                    <Route path='/secret' exact render={ () =>
                        <SecretPage isLogged={isLogged}/>
                    } />

                    <Route path='/starships/:id' render={({ match }) => 
                        <StarshipDetails itemId={match.params.id} />
                    } />

                    <Route render={ () => {
                        return (
                            <div className="text-center mt-4">
                                <h3>404 – page not found</h3>
                            </div>)}
                    }/>
                  </Switch>

                </Router>
              </SwapiProvider>
            </ErrorBoundary>
        );
    }
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from '../loading';
import ErrorIndicator from '../error-indicator';
import SwapiResorse from '../../services/swapi-services';

import './random-planet.css';

export default class RandomPlanet extends Component {
    swapiResorse = new SwapiResorse()

    static defaultProps = {
        updateInterval: 10000
    }

    static propTypes = {
        updateInterval: PropTypes.number
    }

    state = {
        planet: {},
        loading: true,
        error: false
    }

    componentDidMount(){
        const { updateInterval } = this.props
        this.updatePlanet()

        this.intervalId = setInterval(() => {
            this.updatePlanet()
        }, updateInterval)
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    }

    updatePlanet(){
        const id = Math.floor( Math.random() * 19) + 2;

        this.swapiResorse.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    render() {
        const { planet, loading, error } = this.state

        const showError =  error  ? <ErrorIndicator /> : null
        const load      =  loading ? <Loading /> : null
        const content   = (!loading && !error) ? <PlanetView planet={planet} /> : null

        return (
            <div className="random-planet jumbotron rounded">
                {showError}
                {load}
                {content}
            </div>
        );
    }
}

const PlanetView = ( {planet} ) => {
    const { id, name, population, rotationPeriod, diameter } = planet

    return (
        <React.Fragment>
            <img className="planet-image" alt={name}
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />

            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population:</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period:</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter:</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
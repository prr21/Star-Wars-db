import React, { Component } from 'react';
import Loading from '../loading'
import SwapiResorse from '../../services/swapi-services';

import './random-planet.css';

export default class RandomPlanet extends Component {
    swapService = new SwapiResorse()

    state = {
        planet: {},
        loading: true
    }

    constructor(){
        super()
        this.updatePlanet()
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    }

    updatePlanet(){
        this.swapService.getPlanet(12)
            .then(this.onPlanetLoaded)
    }

    render() {
        const { planet, loading } = this.state

        const load    =  loading ? <Loading /> : null
        const content = !loading ? <PlanetView planet={planet} /> : null

        return (
            <div className="random-planet jumbotron rounded">
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
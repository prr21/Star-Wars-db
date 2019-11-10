import React from 'react';
import ItemList from '../item-list';
import { compose, withData, withSwapi, withChildFunction } from '../hoc-helper';

const mapPersonMethodsToProps = (swapi) => {
    return {
        getData: swapi.getAllPeople
    }
}
const mapPlanetMethodsToProps = (swapi) => {
    return {
        getData: swapi.getAllPlanets
    }
}
const mapStarshipMethodsToProps = (swapi) => {
    return {
        getData: swapi.getAllStarships
    }
}

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

const PersonList = compose(
                        withSwapi(mapPersonMethodsToProps),
                        withData,
                        withChildFunction(renderName)
                    )(ItemList)

const PlanetList = compose(
                        withSwapi(mapPlanetMethodsToProps),
                        withData,
                        withChildFunction(renderName)
                    )(ItemList)

const StarshipList = compose(
                        withSwapi(mapStarshipMethodsToProps),
                        withData,
                        withChildFunction(renderModelAndName)
                    )(ItemList)

export { 
	PersonList,
  	PlanetList,
  	StarshipList  }
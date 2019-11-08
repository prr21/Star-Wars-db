import React from 'react';
import ItemList from '../item-list';
import { withData } from '../hoc-helper';
import { withSwapi } from '../hoc-helper';

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    };
};

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

const PersonList = withSwapi(
                        withData( withChildFunction(ItemList, renderName) ),
                        mapPersonMethodsToProps
                    );

const PlanetList = withSwapi(
                        withData( withChildFunction(ItemList, renderName) ),
                        mapPlanetMethodsToProps
                    );

const StarshipList = withSwapi(
                        withData( withChildFunction(ItemList, renderModelAndName) ), 
                        mapStarshipMethodsToProps
                    );

export { 
	PersonList,
  	PlanetList,
  	StarshipList  }
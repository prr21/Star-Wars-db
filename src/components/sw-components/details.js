import React from 'react';

import ItemDetails, { Record } from '../item-details';
import SwapiResorse from '../../services/swapi-services';

const swapiResorse = new SwapiResorse();

const {
    getPerson,
    getPlanet,
    getStarship,
    getImagePerson,
    getImagePlanet,
    getImageStarship
} = swapiResorse;

const PersonDetails = ({ itemId }) => {

    return (
        <ItemDetails
            itemId={itemId}
            getData={getPerson}
            getImageUrl={getImagePerson} >

            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
  );
};

const PlanetDetails = ({ itemId }) => {
    return (
        <ItemDetails
            itemId={itemId}
            getData={getPlanet}
            getImageUrl={getImagePlanet}>

            <Record field="population" label="Population" />
            <Record field="rotationPeriod" label="Rotation Period" />
            <Record field="diameter" label="Diameter" />
        </ItemDetails>
    );
};

const StarshipDetails = ({ itemId }) => {
    return (
        <ItemDetails
            itemId={itemId}
            getData={getStarship}
            getImageUrl={getImageStarship}>

            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="cost_in_credits" label="Cost" />
        </ItemDetails>
    );
};

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
};

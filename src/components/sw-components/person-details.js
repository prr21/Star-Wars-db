import React from 'react';

import ItemDetails, { Record } from '../item-details';
import { withSwapi } from '../hoc-helper'

const PersonDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapi) => {
    return {
        getData: swapi.getPerson,
        getImageUrl: swapi.getImagePerson
    }
}

export default withSwapi(PersonDetails, mapMethodsToProps)

import React from 'react';
import { withRouter } from 'react-router-dom';
import Row from '../row';
import { PersonList, PersonDetails } from '../sw-components';

const PersonPage = ({ match, history }) => {
	const { id } = match.params;

    return (
    	<Row 
            firstWidget = { <PersonList selectedItem={(itemId) => history.push(itemId)} /> } 
            secondWidget = { <PersonDetails itemId={id} /> }
        />
    )
}

export default withRouter(PersonPage)
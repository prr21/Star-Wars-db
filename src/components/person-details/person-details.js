import React, { Component } from 'react';
import Loading from '../loading';
import ErrorIndicator from '../error-indicator';
import SwapiResorse from '../../services/swapi-services.js';
import ErrorBtn from '../error-btn';

import './person-details.css';

export default class PersonDetails extends Component {

    swapService = new SwapiResorse()

    state = {
        loading: false,
        error: false,
        person: null
    }

    componentDidMount(){
        this.updatePerson()
    }

    componentDidUpdate(prevProps){
        if (this.props.personId !== prevProps.personId) {

            this.setState({
                loading: true
            })
            this.updatePerson()
        }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }    

    updatePerson = () => {
        const { personId } = this.props

        if (!personId) {
            return
        }

        this.swapService.getPerson(personId)
            .then((person) => {

                this.setState({
                    person,
                    loading: false,
                    error: false

                })
            })
            .catch(this.onError)

    }

    decideContent(){
        const { person, loading, error } = this.state

        if (loading) {
            return <ShowLoading />

        } else if (!person) {
            return <DefaultDiv />

        } else if (error) {
            return <ErrorIndicator />

        } else {
            return <ShowPerson person={person} />
        }
    }

    render() {
        const content = this.decideContent()

        return content
    }
}

const ShowPerson = ( {person} ) => {
    const { id, name, gender, birthYear, eyeColor } = person
    return (
        <div className="person-details card">
            <img className="person-image" alt={name + ' star-wars'}
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
    
            <div className="card-body">
                <h4>{name}</h4>
    
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender:</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year:</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color:</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
                
                <ErrorBtn />
            </div>
        </div>
    )
}

const DefaultDiv = () => {
    return (
        <div className="text-center p-4 border border-secondary bg-light">
            <span>Выберите персонажа</span>
        </div>
    )
}

const ShowLoading = () => {
    return (
        <div className="d-flex">
            <Loading />
        </div>
    )
}

import React, { Component } from 'react';
import SwapiResorse from '../../services/swapi-services';
import Loading from '../loading';

import './item-list.css';

export default class ItemList extends Component {

    swapiResorse = new SwapiResorse()

    state = {
        loading: true,
        peopleList: null
    }

    componentDidMount = () => {
        this.swapiResorse.getAllPeople()
            .then(this.onPeopleListLoaded)
    }

    onPeopleListLoaded = (arr) => {
        const peopleList = arr.map(( {id,name} ) => {
            return (
                <li className="list-group-item"
                    onClick={ () => this.props.selectedPerson(id) }
                    key={id}>
                    {name}
                </li>
            )
        })

        this.setState({
            peopleList,
            loading: false
        })
    }

    render() {
        const { peopleList, loading } = this.state

        if (loading) {
            return (
                <div className="d-flex"> 
                    <Loading />
                </div>
            )
        }

        return (
            <ul className="item-list list-group">
               {peopleList}
            </ul>
        );
    }
}

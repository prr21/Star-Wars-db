import React, { Component } from 'react';
import Loading from '../loading';
import ErrorIndicator from '../error-indicator';
import SwapiResorse from '../../services/swapi-services.js';
import ErrorBtn from '../error-btn';

import './item-details.css';

export default class ItemDetails extends Component {

    swapService = new SwapiResorse()

    state = {
        loading: false,
        imageItem: null,
        error: false,
        item: null
    }

    componentDidMount(){
        this.updateItem()
    }

    componentDidUpdate(prevProps){
        if (this.props.itemId !== prevProps.itemId) {

            this.setState({
                loading: true
            })
            this.updateItem()
        }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }    

    updateItem = () => {
        const { itemId, getItem, getImageUrl } = this.props

        if (!itemId) {
            return
        }

        getItem(itemId)
            .then((item) => {

                this.setState({
                    item,
                    loading: false,
                    imageItem: getImageUrl(itemId),
                    error: false
                })
            })
            .catch(this.onError)

    }

    decideContent(){
        const { item, loading, error } = this.state

        if (loading) {
            return <ShowLoading />

        } else if (!item) {
            return <DefaultDiv />

        } else if (error) {
            return <ErrorIndicator />

        } else {
            return <ShowItem img={this.state.imageItem}item={item} />
        }
    }

    render() {
        const content = this.decideContent();
        return content
    }
}

const ShowItem = ( {item, img} ) => {
    return (
        <div className="item-details card">

            <img className="item-image"  
                alt={item.name + ' star-wars'}
                src={img}/>
    
            <div className="card-body">
                <h4>{item.name}</h4>
    
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender:</span>
                        <span></span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year:</span>
                        <span></span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color:</span>
                        <span></span>
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
            <span>Выберите ячейку</span>
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

import React, { Component } from 'react';
import Loading from '../loading';
import ErrorIndicator from '../error-indicator';
import ErrorBoundary from '../error-boundary';
import ErrorBtn from '../error-btn';

import SwapiResorse from '../../services/swapi-services.js';
import './item-details.css';

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}:</span>
            <span>{ item[field] }</span>
        </li>
    )
}
export { Record }

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
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {

            this.setState({
                loading: true
            })
            this.updateItem()
        }
    } 

    updateItem = () => {
        const { itemId, getData, getImageUrl } = this.props

        if (!itemId) {
            return (
                this.setState({
                    loading: false
                }))
        }

        getData(itemId)
            .then((item) => {

                this.setState({
                    item,
                    loading: false,
                    imageItem: getImageUrl(itemId),
                    error: false
                })
            })
            .catch(
                this.setState({
                    loading: false,
                    error: true
                })
            )

    }

    decideContent(){
        const { item, imageItem, loading, error } = this.state

        if (loading) {
            return <ShowLoading />

        } else if (!item) {
            return <DefaultDiv />

        } else if (error) {
            return <ErrorIndicator />

        } else {
            return <ShowItem 
                children={this.props.children} 
                img={imageItem}
                item={item} />
        }
    }

    render() {
        const content = this.decideContent();
        return content
    }
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

const ShowItem = ({item, img, children}) => {
    return (
        <ErrorBoundary>
        <div className="item-details card">

            <img className="item-image"  
                alt={item.name + ' star-wars'}
                src={img}/>
    
            <div className="card-body">
                <h4>{item.name}</h4>
    
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
                
                <ErrorBtn />
            </div>

        </div>
        </ErrorBoundary>
    )
}
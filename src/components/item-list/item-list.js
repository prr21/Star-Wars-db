import React, { Component } from 'react';
import Loading from '../loading';

import './item-list.css';

export default class ItemList extends Component {

    state = {
        itemList: null
    }

    componentDidMount = () => {
        const { getData } = this.props
        
        getData()
            .then((itemList) => {

                this.setState({
                    itemList
                })
            })
    }

    renderItems = (arr) => {
        return arr.map((item) => {

            const label = this.props.children(item)
            const {id} = item

            return (
                <li className="list-group-item"
                    onClick={ () => this.props.onSelectedItem(id)}
                    key={id}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const { itemList } = this.state

        if (!itemList) {
            return (
                <div className="d-flex"> 
                    <Loading />
                </div>
            )
        }
        const list = this.renderItems(itemList)

        return (
            <ul className="item-list list-group">
               {list}
            </ul>
        );
    }
}

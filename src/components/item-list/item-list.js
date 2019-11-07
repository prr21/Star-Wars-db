import React from 'react';
import './item-list.css';

const ItemList = (props) => {

    const { data, selectedItem, children: renderItem } = props
    const items = data.map((item) => {

        const label = renderItem(item)
        const { id } = item

        return (
            <li className="list-group-item"
                onClick={ () => selectedItem(id)}
                key={id}>
                {label}
            </li>
        )
    })

    return (
        <ul className="item-list list-group">
           {items}
        </ul>
    );
}
export default ItemList
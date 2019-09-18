import React from 'react';

import './loading.css';

const ItemList = () => {
    return (
        <div className="lds-css ng-scope loading">
            <div style={{width: '100%',height:'100%'}} className="lds-rolling">
                <div></div>
            </div>
        </div>
    );
}
export default ItemList
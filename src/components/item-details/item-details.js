import React, { useState, useEffect } from 'react';
import Loading from '../loading';
import ErrorIndicator from '../error-indicator';
import ErrorBoundary from '../error-boundary';
import ErrorBtn from '../error-btn';

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

const ItemDetails = ( {itemId, getData, getImageUrl, children} ) => {

    const [ status, setStatus ]              = useState( {loading: true, error: false} );
    const [ itemDetails, changeItemDetails ] = useState( {imageItem: null, item: null} );

    useEffect(() => {
        function update(){
            updateItem();
        }
        update();
    }, [])

    useEffect(() => {
        function update(){
            setStatus( {loading:true, error:false} );
            updateItem()
        }
        update()
        
    }, [itemId, getData, getImageUrl])

    const updateItem = () => {
        if (!itemId) {
            return setStatus( {loading:false, error:false} );
        }

        getData(itemId)
            .then((item) => {
                setStatus( {loading:false, error:false} );

                changeItemDetails({
                    item,
                    imageItem: getImageUrl(itemId)
                })
            })
            .catch(() => {
                setStatus( {loading:false, error:true} );
            })
    }

    const decideContent = () => {
        if (status.loading) {
            return <ShowLoading />

        } else if (!itemDetails.item) {
            return <DefaultDiv />
            
        } else if (status.error) {
            return <ErrorIndicator />

        } else {
            return <ShowItem 
                children={children} 
                img={itemDetails.imageItem}
                item={itemDetails.item} />
        }
    }

    return decideContent();
}

export default ItemDetails

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
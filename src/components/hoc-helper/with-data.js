import React, { Component } from 'react'
import Loading from '../loading';

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null
        }

        componentDidMount = () => {
            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
        }

        render(){
            const { data } = this.state
            
            if (!data) {
                return (
                    <div className="d-flex"> 
                        <Loading />
                    </div>
                )
            }
            return <View {...this.props} data={data}/>
        }
    }
}

export default withData

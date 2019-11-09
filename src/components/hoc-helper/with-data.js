import React, { Component } from 'react'
import Loading from '../loading';

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            loading: false
        }

        componentDidUpdate(prevProps){
            if (this.props.getData !== prevProps.getData) {

                this.setState({
                    loading: true
                })

                this.update()
            }
        }

        componentDidMount = () => {
            this.update()
        }

        update(){
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false
                    })
                })
        }

        render(){
            const { data, loading } = this.state
            
            if (!data || loading) {
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

import React, { Component } from 'react'
import ErrorIndicator from '../error-indicator';
import Loading from '../loading';

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            loading: false,
            error: false
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
                        loading: false,
                        error: false
                    })
                })
                .catch (() => {
                    this.setState({
                        error: true,
                        loading: false
                    });
                })
        }

        render(){
            const { data, loading, error } = this.state
            
            if (!data || loading) {
                return (
                    <div className="d-flex"> 
                        <Loading />
                    </div>
                )
                
            } else if (error) {
                return <ErrorIndicator />
            }

            return <View {...this.props} data={data}/>
        }
    }
}

export default withData

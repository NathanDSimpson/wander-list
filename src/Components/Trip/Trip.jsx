import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TripListIcon from './TripListIcon'

class Trip extends Component{
    constructor(){
        super()
        this.state = {
            trip_id: 0,
            viewLists: false
        }
    }

    componentWillMount(){
        this.setState({
            trip_id: +this.props.match.params.id
        })
    }


    viewTripLists = () => {
        this.setState({
            viewLists: !this.state.viewLists
        })
    }

    render(){
        const temp = this.props.trips.filter(trip => trip.trip_id === this.state.trip_id)
        const trip = temp[0]
        let trip_lists
        if (this.state.viewLists){
            trip_lists =  trip.trip_lists.map(list => {
                return (
                    <TripListIcon key={list.list_id} list={list}>
                    </TripListIcon>
                )
            })
        }

        return(
            <div>
                <h3>
                    {trip.name}
                </h3>
                <h4>
                    {trip.description}
                </h4>
                <button onClick={this.viewTripLists}> Toggle view trip lists </button>
                <h6>
                    {trip_lists}
                </h6>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, trips } = reduxState
    return { authenticated, user_id, trips }
}

export default connect(mapStateToProps, null)(withRouter(Trip))


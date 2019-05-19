import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TripListIcon from './TripListIcon'
import { getUserData } from '../../redux/reducer'
import axios from 'axios'

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

    deleteTrip = async () => {
        // navigate back to all trips
        this.props.history.push(`/trips`)
        try{
            // send data to db via axios endpoint, controller, and sql file
            await axios.post('/api/delete-trip', { trip_id: this.state.trip_id })
            // get updated info for user from db
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // dispatch new info to redux
            this.props.getUserData(res.data)
        } catch(err){
            alert(`Error: Trips.jsx - submitTrip`)
        }
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
                    <button onClick={this.deleteTrip}> Delete Trip </button>
                    <button onClick={this.viewTripLists}> Toggle view trip lists </button>
                </h3>
                <h4>
                    {trip.description}
                </h4>
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

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trip))


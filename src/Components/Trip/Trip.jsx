import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TripListIcon from './TripListIcon'
import TripListIconAdd from './TripListIconAdd'
import { getUserData } from '../../redux/reducer'
import axios from 'axios'
import TripEdit from './TripEdit'

class Trip extends Component{
    constructor(){
        super()
        this.state = {
            trip_id: 0,
            viewLists: true,
            edit: false,
        }
    }

    componentWillMount(){
        if (this.props.trips.length === 0){
            this.props.history.push('/trips')
        } else{
            this.setState({
                trip_id: +this.props.match.params.id
            })
        }
    }


    viewTripLists = () => {
        this.setState({
            viewLists: !this.state.viewLists
        })
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
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

    // deleteTripList = async () => {
    //     try{
    //         // send data to db via axios endpoint, controller, and sql file
    //         await axios.post('/api/delete-trip-list', { trip_id: this.state.trip_id,  })
    //         // get updated info for user from db
    //         const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
    //         // dispatch new info to redux
    //         this.props.getUserData(res.data)
    //     } catch(err){
    //         alert(`Error: Trips.jsx - submitTrip`)
    //     }
    // }

    // addTripList = async () => {
    //     try{
    //         // send data to db via axios endpoint, controller, and sql file
    //         await axios.post('/api/delete-trip-list', { trip_id: this.state.trip_id,  })
    //         // get updated info for user from db
    //         const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
    //         // dispatch new info to redux
    //         this.props.getUserData(res.data)
    //     } catch(err){
    //         alert(`Error: Trips.jsx - submitTrip`)
    //     }
    // }

    render(){
        if (this.props.trips.length === 0){
            return null
        }
        
        const temp = this.props.trips.filter(trip => trip.trip_id === this.state.trip_id)
        const trip = temp[0]
        let trip_lists
        if (this.state.viewLists){
            trip_lists =  trip.trip_lists.map((list, index) => {
                return (
                    <div className='trip-lists-delete' key={index} >
                        <TripListIcon list={list}> </TripListIcon>
                        <i className="fas fa-trash"></i>
                    </div>
                )
            })
        }

        let view 
        if (!this.state.edit) {
            view = (
                <div className='sub-trip'>
                    <div className='trip-title-single-trip'>
                        <div onClick={this.viewTripLists}> 
                        {this.state.viewLists ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-right"></i>}
                        </div>
                        {trip.name}
                        <div onClick={this.toggleEdit}> <i className="fas fa-edit"></i> </div>
                        <div onClick={this.deleteTrip}> <i className="fas fa-trash"></i> </div>
                    </div>
                    <div className='trip-description'>
                        {trip.description}
                    </div>
                    <ul className='trip-lists'>
                        {trip_lists}
                    </ul>
                </div>
            )
        } else{
            view = (
                <TripEdit trip={trip} toggleEdit={this.toggleEdit}></TripEdit>
            )
        }

        let tripListWizard = this.props.lists.map((list, index) => (
            <div className='trip-add-list' key={index} >
                <i className="fas fa-plus"> </i>
                <TripListIconAdd list={list} > </TripListIconAdd>
            </div>
            ))

        return(
            <div className='trip'> 
                {view}
                <ul className='trip-add-lists'>
                    <div className='trip-add-lists-header'> Add Lists to your Trip:</div>
                    {tripListWizard}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, trips, lists } = reduxState
    return { authenticated, user_id, trips, lists }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trip))


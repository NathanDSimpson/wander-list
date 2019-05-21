import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TripIcon from './TripIcon'
import axios from 'axios'
import { getUserData } from '../../redux/reducer'

class Trips extends Component{
    constructor(){
        super()
        this.state = {
            addTrip: false,
            tripName: '',
            tripDescription: ''
        }
    }

    toggleAdd = () => {
        this.setState({
            addTrip: !this.state.addTrip
        })
    }

    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    submitTrip = async (event) => {
        event.preventDefault()
        this.toggleAdd()
        try{
            // send data to db via axios endpoint, controller, and sql file
            await axios.post('/api/add-trip', {
                user_id: this.props.user_id,
                name: this.state.tripName,
                description: this.state.tripDescription
            })
            // get updated info for user from db
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // dispatch new info to redux
            this.props.getUserData(res.data)
        } catch(err){
            alert(`Error: Trips.jsx - submitTrip`)
        }
    }

    render(){
        let tripIconsOrAddTripWizard
        if (this.state.addTrip){
            tripIconsOrAddTripWizard = (
                <form onSubmit={this.submitTrip}>
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='tripName' 
                        placeholder='name'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='tripDescription' 
                        placeholder='description'
                    />
                    <button> Add Trip </button>
                </form>
            )
        } else{
            tripIconsOrAddTripWizard = this.props.trips.map((trip) => {
                return <TripIcon key={trip.trip_id} trip={trip}> </TripIcon>
        })
        }

        let buttonIcon
        if (this.state.addTrip){
            buttonIcon = (<i className="fas fa-chevron-left"></i>)
        }else{
            buttonIcon = (<i className="fas fa-plus">  Trip</i>)
        }

        return(
            <div>
                <button onClick={this.toggleAdd}> {buttonIcon} </button>
                <div>
                    {tripIconsOrAddTripWizard}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trips))
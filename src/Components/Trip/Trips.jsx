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
        console.log(`submitting trip`)
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
        let addTrip
        if (this.state.addTrip){
            addTrip = (
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
                    <button> Submit </button>
                </form>
            )
        }

        return(
            <div>
                <button onClick={this.toggleAdd}> {this.state.addTripWizard ? '- Collapse' : '+ Add Trip'} </button>
                <div>
                    {addTrip}
                </div>
                <section className='trips'>
                    {this.props.trips.map((trip) => {
                            return <TripIcon key={trip.trip_id} trip={trip}> </TripIcon>
                    })}
                </section>
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
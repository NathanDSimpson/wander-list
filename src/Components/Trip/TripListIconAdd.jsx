import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { getUserData } from '../../redux/reducer'

class TripListIcon extends Component{
    constructor(){
        super()
        this.state = {
            addToTrip: false,
            removeFromTrip: false
        }
    }

    componentWillMount(){
        if (this.props.status === 'addToList'){
            this.setState({
                addToTrip: true
            })
        } else if(this.props.status === 'removeFromList'){
            this.setState({
                removeFromTrip: true
            })
        }
    }

    goToList = () => {
        this.props.history.push(`/list/${this.props.list.list_id}`)
    }

    addToTrip = async () => {
        try{
            // send data to db via axios endpoint, controller, and sql file
            await axios.post('/api/add-trip-list', { trip_id: +this.props.match.params.id, list_id: this.props.list.list_id })
            // get updated info for user from db
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // dispatch new info to redux
            this.props.getUserData(res.data)
        } catch(err){
            alert(`Error: Trips.jsx - submitTrip`)
        }
    }

    render(){

        return(
            <li>
                <div onClick={this.addToTrip}>
                    {this.props.list.name}
                </div>                
            </li>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TripListIcon))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TripListIcon from './TripListIcon'

class TripIcon extends Component{
    constructor(){
        super()
        this.state = {
            viewLists: false
        }
    }

    viewTripLists = () => {
        this.setState({
            viewLists: !this.state.viewLists
        })
    }

    goToTrip = () => {
        this.props.history.push(`/trip/${this.props.trip.trip_id}`)
    }

    render(){
        let trip_lists
        if (this.state.viewLists){
            trip_lists =  this.props.trip.trip_lists.map(list => {
                return (
                    <TripListIcon key={list.list_id} list={list}>
                    </TripListIcon>
                )
            })
        }

        return(
            <div>
                <h3 onClick={this.goToTrip}>
                    {this.props.trip.name}
                </h3>
                <h4>
                    {this.props.trip.description}
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

export default connect(mapStateToProps, null)(withRouter(TripIcon))


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
            trip_lists =  this.props.trip.trip_lists.map((list, index) => {
                return (
                    <div key={index}>
                        <TripListIcon list={list}>
                        </TripListIcon>
                    </div>
                )
            })
        }

        let viewLists
        this.state.viewLists ? viewLists = (<i className="fas fa-caret-down"></i>) : viewLists = (<i className="fas fa-caret-right"></i>)

        return(
            <div className='sub-trip'>
                <div className='trip-title'>
                    <div onClick={this.viewTripLists}> {viewLists} </div>
                    <div onClick={this.goToTrip}>
                        {this.props.trip.name}
                    </div>
                </div>
                <div className='trip-description'>
                    {this.props.trip.description}
                </div>
                <ul>
                    {trip_lists}
                </ul>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, trips } = reduxState
    return { authenticated, user_id, trips }
}

export default connect(mapStateToProps, null)(withRouter(TripIcon))


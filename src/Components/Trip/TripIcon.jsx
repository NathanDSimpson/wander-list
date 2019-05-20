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
                    <li key={list.list_id}>
                        <TripListIcon list={list}>
                        </TripListIcon>
                    </li>
                )
            })
        }

        let buttonIcon
        if (this.state.viewLists){
            buttonIcon = (<i className="fas fa-minus"></i>)
        }else{
            buttonIcon = (<i className="fas fa-plus"></i>)
        }

        return(
            <div>
                <h3>
                    <span onClick={this.goToTrip}>
                        {this.props.trip.name}
                    </span>
                    <button onClick={this.viewTripLists}> {buttonIcon} </button>
                </h3>
                <h6>
                    {this.props.trip.description}
                </h6>
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


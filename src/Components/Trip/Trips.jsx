import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Trips extends Component{
    constructor(){
        super()
        this.state = {
            addTripWizard: false
        }
    }

    toggleAdd = () => {
        this.setState({
            addTripWizard: !this.state.addTripWizard
        })
    }

    render(){

        return(
            <div>
                <button onClick={this.toggleAdd}> {this.state.addTripWizard ? '- Collapse' : '+ Add Trip'} </button>
                    <section className='trips'>
                    {this.props.trips.map((trip) => {
                            return <div key={trip.trip_id}>{trip.name}</div>
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

export default connect(mapStateToProps, null)(withRouter(Trips))
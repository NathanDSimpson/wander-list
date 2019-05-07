import React, { Component } from 'react'

export default class Trips extends Component{
    constructor(){
        super()
        this.state = {
            allUserTrips: []
        }
    }

    render(){
        return(
            <div>
                This will display all of our users stored TRIPS.
            </div>
        )
    }
}
import React, { Component } from 'react'

export default class Lists extends Component{
    constructor(){
        super()
        this.state = {
            allUserLists: []
        }
    }

    render(){
        return(
            <div>
            This will display all of our users stored LISTS.
            {/* <h1>
                <span>Trips</span>
                <span>Lists</span>
                <span>Items</span>
            </h1> */}
            </div>
        )
    }
}
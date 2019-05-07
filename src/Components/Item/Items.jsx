import React, { Component } from 'react'

export default class Items extends Component{
    constructor(){
        super()
        this.state = {
            allUserItems: []
        }
    }

    render(){
        return(
            <div>
                This will display all of our users stored ITEMS.
            </div>
        )
    }
}

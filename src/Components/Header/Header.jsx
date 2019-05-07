import React, { Component } from 'react'

export default class Header extends Component{
    constructor(){
        super()
        this.state = {
            loggedIn: false // will use this to toggle username and login/register in the upper right
        }
    }

    render(){
        return(
            <div>
                WanderList
            </div>
        )
    }
}

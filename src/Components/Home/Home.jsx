import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Login from '../Login/Login'

class Header extends Component{

    render(){
        return(
            <>
                <Login/>
            </>
        )
    }
}

export default withRouter(Header)
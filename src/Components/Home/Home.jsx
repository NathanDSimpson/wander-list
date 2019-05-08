import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Header extends Component{

    render(){
        return(
            <>
                <h3>Welcome!</h3> 
            </>
        )
    }
}

export default withRouter(Header)
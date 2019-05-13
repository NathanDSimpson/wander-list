import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Login from '../Login/Login'
import { Link } from 'react-router-dom'

class Header extends Component{

    render(){
        return(
            <>
                <Login/>
                <div
                className='register-prompt'
                >
                    <div>
                        Need an account? 
                    </div>
                    <div>
                        <Link to='/register'> Sign Up </Link>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Header)
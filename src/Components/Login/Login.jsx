import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser, getUserData } from '../../redux/reducer'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    // Take the user inputs for email and password. store them on local state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = this.state
        try {
            // verify login credentials with db
            const response = await axios.post('/auth/login', { email, password }) // log in
            const { user_id, firstname, lastname} = response.data.user
            this.props.loginUser({ user_id, firstname, lastname, email, authenticated: true })

            // get user's lists, trips, and items from db
            const res = await axios.post('/api/user-data', {user_id})
            this.props.getUserData(res.data)

            // navigate the user
            this.props.history.push('/items') // navigate to the users items view
        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'We are having trouble logging you in'
              })        
        }
    }

    render(){
        return(
            <div className='login'>
                <form onSubmit={this.handleSubmit}> 
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='email' 
                        placeholder='email'
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="password" 
                        name='password' 
                        placeholder='password'
                    />
                    <button>
                        SUBMIT
                    </button>
                </form>
                <div
                className='register-prompt'
                >
                    <div>
                        Need an account? 
                    </div>
                    <div>
                        <Link to='/register'> Register </Link>
                    </div>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = {
    loginUser,
    getUserData
}

export default connect(null, mapDispatchToProps)(withRouter(Login))

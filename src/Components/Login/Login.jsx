import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser, getItems, getLists, getTrips } from '../../redux/reducer'
import { Link } from 'react-router-dom'

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

    // handleSubmit = async (event) => {
    //     event.preventDefault()
    //     const { email, password } = this.state
    //     try {
    //         const response = await axios.post('/auth/login', { email, password }) // log in
    //         const { user_id, firstname, lastname} = response.data.user
    //         this.props.loginUser({ user_id, firstname, lastname, email, authenticated: true }) // dispatch to store
    //         const res = await axios.post('/api/items', {user_id})
    //         const items = res.data
    //         console.log()
    //         this.props.getItems(items)
    //         this.props.history.push('/items')
    //     } catch(err){alert(`The server is having trouble logging in (Login.jsx)`)}
    // }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = this.state
        try {
            const response = await axios.post('/auth/login', { email, password }) // log in
            const { user_id, firstname, lastname} = response.data.user
            this.props.loginUser({ user_id, firstname, lastname, email, authenticated: true }) // dispatch to store
            const res = await axios.post('/api/user-data', {user_id})
            const userData = res.data
            console.log(`Login.jsx - handleSubmit:`, userData)
            this.props.getItems(userData.items)
            this.props.getLists(userData.lists)
            this.props.getTrips(userData.trips)
            this.props.history.push('/items') // naviagate to the users items view
        } catch(err){alert(`The server is having trouble logging in (Login.jsx)`)}
    }

    render(){
        return(
            <>
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
                        type="text" 
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
            </>
        )
    }

}

const mapDispatchToProps = {
    loginUser,
    getItems,
    getLists,
    getTrips,
}

export default connect(null, mapDispatchToProps)(withRouter(Login))

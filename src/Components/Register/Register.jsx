import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../redux/reducer'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const { firstname, lastname, email, password, confirmPassword } = this.state
        if (password !== confirmPassword){  // Check that passwords match  
            //DO SOME STYLING to make the boxes red if they don't
            return
        }
        try {
            const response = await axios.post('/auth/register', {firstname, lastname, email, password}) // register in out db
            this.props.registerUser({firstname, lastname, email, id: response.data.user.id, authenticated: true})// dispatch to store
        } catch(err){
            // display an error message
        }
    }

    render(){
        // console.log(`Props for <Register>`, this.props)
        return(
            <>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='firstname' 
                        placeholder='First Name'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='lastname' 
                        placeholder='Last Name'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='email' 
                        placeholder='Email'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='password' 
                        placeholder='Password'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='confirmPassword' 
                        placeholder='Re-enter Password'
                        />
                    <button> SUBMIT </button>
                </form>
            </>
        )
    }

}

const mapStateToProps = (reduxState) => {
    const { firstname, lastname, email, user_id } = reduxState
    return { firstname, lastname, email, user_id }
}

const mapDispatchToProps = {
    registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../redux/reducer'
import { Link } from 'react-router-dom'


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
        if (password !== confirmPassword){
            alert(`Your passwords do not match`)
            return
        }
        try {
            const response = await axios.post('/auth/register', {firstname, lastname, email, password}) // register in out db
            this.props.registerUser({firstname, lastname, email, id: response.data.user.id, authenticated: true})// dispatch to store
            this.props.history.push('/items')
        } catch(err){
            alert(`Log In Failed.`)
        }
    }

    render(){
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='firstname' 
                        placeholder='First Name'
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='lastname' 
                        placeholder='Last Name'
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="text" 
                        name='email' 
                        placeholder='Email'
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="password" 
                        name='password' 
                        placeholder='Password'
                    />
                    <input 
                        className='form-entry'
                        onChange={this.handleInput} 
                        type="password" 
                        name='confirmPassword' 
                        placeholder='Re-enter Password'
                        />
                    <button className='register-button'> SUBMIT </button>
                </form>
                <div
                className='register-prompt'
                >
                    <div>
                        Already have an account? 
                    </div>
                    <div>
                        <Link to='/login'> Log In </Link>
                    </div>
                </div>
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

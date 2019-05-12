import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser, getItems } from '../../redux/reducer'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
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
        const { email, password } = this.state
        try {
            const response = await axios.post('/auth/login', { email, password }) // log in
            const { id, firstname, lastname} = response.data.user
            this.props.loginUser({ id, firstname, lastname, email, authenticated: true }) // dispatch to store
            const res = await axios.post('/api/items', {user_id: id})
            const items = res.data
            this.props.getItems(items)
        } catch(err){
            // display an error message
        }
    }

    render(){
        // console.log(`Props for <Login>`, this.props)
        return(
            <>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}> 
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='email' 
                        placeholder='email'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='password' 
                        placeholder='password'
                    />
                    <button> Log In </button>
                </form>
            </>
        )
    }

}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname, lastname, email, items, lists, trips } = reduxState
    return { authenticated, user_id, firstname, lastname, email, items, lists, trips }
}

const mapDispatchToProps = {
    loginUser,
    getItems
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
import React, { Component } from 'react'

export default class Login extends Component {
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

    render(){
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
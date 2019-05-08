import React, { Component } from 'react';


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
            const response = await axios.post('/auth/login', { email, password }) 
            const { id, firstname, lastname} = response.data.user
            console.log(`response:`, response)
            console.log({ id, firstname, lastname, email, authenticated: true })
            this.props.loginUser({ id, firstname, lastname, email, authenticated: true })// dispatch to store
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
    const { authenticated, user_id, firstname, lastname, email, allItems, allLists, allTrips } = reduxState
    return { authenticated, user_id, firstname, lastname, email, allItems, allLists, allTrips }
}

const mapDispatchToProps = {
    loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
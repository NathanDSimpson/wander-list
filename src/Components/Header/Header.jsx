import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logoutUser, loginUser, getUserData } from '../../redux/reducer'
import axios from 'axios';

class Header extends Component{
    constructor(){
        super()
        this.state = {
            showMenu: false
        }
    }

    // Check if the server has a session. if so, update redux accordingly
    async componentWillMount(){
        console.log(`Header.jsx: componentDidMount`)
        try {
            const res = await axios.get('/auth/continue-session')
            const { user_id, firstname, lastname, email } = res.data
            if (res.data){ // res.data is an empty sting if there is no the server has no session
                this.props.loginUser({ user_id, firstname, lastname, email, authenticated: true })
                const res = await axios.post('/api/user-data', {user_id})
                this.props.getUserData(res.data)
                // this.props.history.push('/items')
            } else {
                this.props.history.push('/')
            }
        } catch(err){
            console.log(`Header.jsx - componentWillMount catch(err):`, err)
            alert(`Header.jsx: componentDidMount`)
        }
    }

    // toggle the drop down menu 
    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    // log out the user
    logout =  async () => {
        try{
            await axios.get('/auth/logout')
            this.props.logoutUser()
            this.toggleMenu()
        } catch(err) {
            alert(`Header.jsx: logout`)
        }
    }
    
    render(){
        // conditionally render the dropdown menu depending on whether or not the user is logged in
        let menu = ''
        if (this.state.showMenu){
            if (this.props.authenticated){
                menu = (
                    <ul className='hamburgerMenu'>
                        <Link to='/trips' onClick={this.toggleMenu}>My Trips</Link>
                        <Link to='/lists' onClick={this.toggleMenu}> My Lists</Link>
                        <Link to='/items' onClick={this.toggleMenu}> My Items</Link>
                        <Link to='/' onClick={this.logout}>Log Out</Link>
                    </ul>
                    )
            } else {
                menu = (
                    <ul className='hamburgerMenu'>
                        <Link to='/login' onClick={this.toggleMenu}>Log In</Link>
                        <Link to='/register' onClick={this.toggleMenu}>Register</Link>
                    </ul>
                    )
            }

        }
        return(
            <>
                <h1 className='navbar'>
                    WanderList
                    <div className='user-menu' onClick={this.toggleMenu}> 
                        <span>
                            {this.props.firstname}
                        </span>
                        <i className="fas fa-user fa-xs"></i>
                        <i className="fas fa-sort-down fa-xs"></i>                                        
                    </div>
                </h1> 
                {menu}
            </>
        )
    }
}
const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname } = reduxState
    return { authenticated, user_id, firstname} 
}

const mapDispatchToProps = {
    logoutUser,
    loginUser,
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
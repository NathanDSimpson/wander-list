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
        try {
            const res = await axios.get('/auth/continue-session')
            const { user_id, firstname, lastname, email } = res.data
            if (res.data){ // res.data is an empty sting if there is no the server has no session
                this.props.loginUser({ user_id, firstname, lastname, email, authenticated: true })
                const res = await axios.post('/api/user-data', {user_id})
                this.props.getUserData(res.data)
            } else {
                this.props.history.push('/')
            }
        } catch(err){
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

    goToItems = () => this.props.history.push('/items')
    goToLists = () => this.props.history.push('/lists')
    goToTrips = () => this.props.history.push('/trips')

    render(){
        const location = this.props.location.pathname
        let trips = 'Trips'
        let lists = 'Lists'
        let items = 'Items'
        if (location.includes('trip')){trips = 'TRIPS'}
        if (location.includes('list')){lists = 'LISTS'}
        if (location.includes('item')){items = 'ITEMS'}
        
        // conditionally render the dropdown menu depending on whether or not the user is logged in
        let menu
        if (this.state.showMenu){
            if (this.props.authenticated){
                menu = (
                    <ul className='hamburgerMenu'>
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
            
        let navbar
        if (this.props.authenticated){
            navbar = (
                <span className='navbar'>
                    <nav onClick={this.goToTrips} > {trips} </nav>
                    <nav onClick={this.goToLists} > {lists} </nav>
                    <nav onClick={this.goToItems} > {items} </nav>
                </span>
            )
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
                    </div>
                </h1> 
                {menu}
                {navbar}
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
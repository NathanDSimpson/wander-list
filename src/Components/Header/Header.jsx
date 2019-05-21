import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logoutUser, loginUser, getUserData } from '../../redux/reducer'
import axios from 'axios';
import Swal from 'sweetalert2'

class Header extends Component{
    constructor(){
        super()
        this.state = {
            showMenu: false
        }
    }

    // Check if the server has a session
    // dispatch user_id from session to db to get info and update redux
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
            Swal.fire('Cannot communicate with database. Sorry!')
        }
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    logout =  async () => {
        this.props.history.push('/')
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
        // Make users location all CAPS in navbar
        const location = this.props.location.pathname
        let trips = 'Trips'
        let lists = 'Lists'
        let items = 'Items'
        if (location.includes('trip')){trips = 'TRIPS'}
        if (location.includes('list')){lists = 'LISTS'}
        if (location.includes('item')){items = 'ITEMS'}
        
        // conditionally render the dropdown menu depending on whether or not the user is logged in
        let menu
        // dont render anything until click
        if (this.state.showMenu){
            // conditionally render
            if (this.props.authenticated){
                menu = (
                    <ul className='dropDown'>
                        <li onClick={this.logout}><i className="fas fa-sign-out-alt"></i></li>
                        {/* <Link to='/' onClick={this.logout}> <i className="fas fa-sign-out-alt"></i> </Link> */}
                    </ul>
                    )
                } else {
                    menu = (
                        <ul className='dropDown'>
                            <li><Link to='/login' onClick={this.toggleMenu}>Log In</Link></li>
                            <li><Link to='/register' onClick={this.toggleMenu}>Register</Link></li>
                        </ul>
                    )
                }
            }
            
        // only render the navbar if the user is logged in
        let navbar
        if (this.props.authenticated){
            navbar = (
                <h3 className='navbar'>
                    <nav onClick={this.goToTrips} > {trips} </nav>
                    <nav onClick={this.goToLists} > {lists} </nav>
                    <nav onClick={this.goToItems} > {items} </nav>
                </h3>
            )
        }
    
        return(
            <>
                <h1 className='header'>
                    <div>
                        WanderList
                    </div>
                    <div onClick={this.toggleMenu}> 
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
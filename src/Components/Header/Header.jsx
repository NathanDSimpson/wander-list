import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/reducer'
import axios from 'axios';

class Header extends Component{
    constructor(){
        super()
        this.state = {
            showMenu: false
        }
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    logout =  async () => {
        try{
            await axios.get('/auth/logout')
            this.props.logoutUser()
            this.toggleMenu()
        } catch(err) {
            alert(`Error logging out`)
        }
    }
    
    render(){
        let hamburger = ''
        if (this.state.showMenu){
            if (this.props.authenticated){
                hamburger = (
                    <ul className='hamburgerMenu'>
                        <Link to='/trips' onClick={this.toggleMenu}>My Trips</Link>
                        <Link to='/lists' onClick={this.toggleMenu}> My Lists</Link>
                        <Link to='/items' onClick={this.toggleMenu}> My Items</Link>
                        <Link to='/' onClick={this.logout}>Log Out</Link>
                    </ul>
                    )
            } else {
                hamburger = (
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
                {hamburger}
            </>
        )
    }
}
const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname } = reduxState
    return { authenticated, user_id, firstname} 
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
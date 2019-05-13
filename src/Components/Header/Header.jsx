import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component{

    render(){
        return(
            <>
                <h1 className='navbar'>
                    WanderList
                    <div className='user-menu'>     
                        <span>
                            {this.props.firstname}
                        </span>
                        <i className="fas fa-user fa-xs"></i>
                        <i className="fas fa-sort-down fa-xs"></i>                                        
                    </div>
                </h1> 
				<Link to='/login'>-Login- </Link>
				<Link to='/register'>-Register- </Link>
                <Link to='/trips'>-Trips- </Link>
				<Link to='/lists'>-Lists- </Link>
				<Link to='/items'>-Items- </Link>
            </>
        )
    }
}
const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname } = reduxState
    return { authenticated, user_id, firstname} 
}


export default connect(mapStateToProps, null)(Header)
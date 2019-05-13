import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component{

    render(){
        return(
            <>
                <h1 className='navbar'>
                    WanderList
                    <div>                    
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

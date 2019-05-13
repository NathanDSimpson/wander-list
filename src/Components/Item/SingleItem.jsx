import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class SingleItem extends Component{

    render(){
        return(
            <div className='single-item'>
                <div className='item-name'>
                    {this.props.item.name}
                </div>
                <button>
                    <i class="fas fa-times"></i>
                </button>
                <ul>
                    <li>
                        {this.props.item.description}
                    </li>
                </ul>
            </div>
        )
    }
}

export default (withRouter(SingleItem))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ItemIcon extends Component{

    editItem = () => {
        this.props.history.push(`/item/${this.props.item.item_id}`)
    }

    render(){
        return(
            <div className='single-item' onClick={this.editItem}>
                <span className='item-name'>
                    {this.props.item.name}
                </span>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(ItemIcon))
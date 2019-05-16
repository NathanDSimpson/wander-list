import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { deleteItem } from '../../redux/reducer'

class SingleItem extends Component{

    editItem = () => {
        // click on the item name to navigate to the edit view w/ the idem id as a param
        this.props.history.push(`/edit/${this.props.item.item_id}`)
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

const mapDispatchToProps = {
    deleteItem
}

export default connect(null, mapDispatchToProps)(withRouter(SingleItem))

import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import { deleteItem } from '../../redux/reducer'



class SingleItem extends Component{

    deleteItem = async () => {
        const { item_id, user_id } = this.props.item
        try {
            const res = await axios.post('/api/delete', {item_id, user_id })
            const updatedItemsList = res.data
            this.props.deleteItem(updatedItemsList)
        } catch(err){
            alert(`Whoops! Something went wrong.`)
        }
    }

    render(){
        return(
            <div className='single-item'>
                <span className='item-name'>
                    {this.props.item.name}
                </span>
                <span>
                    <button>
                        <i className="fas fa-times"
                        onClick={this.deleteItem}
                        ></i>
                    </button>
                </span>
            </div>
        )
    }
}


const mapDispatchToProps = {
    deleteItem
}

export default connect(null, mapDispatchToProps)(withRouter(SingleItem))

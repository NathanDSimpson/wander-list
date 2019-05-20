import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {getUserData} from '../../redux/reducer'

class ListItemIcon extends Component{

    removeItemFromList = async () => {
        await axios.post('/api/remove-list-item', {item_id: this.props.item.item_id, list_id: +this.props.match.params.id })
        const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
        this.props.getUserData(res.data)
    }

    render(){
        return(
            <div className='single-item' onClick={this.removeItemFromList}>
                <span className='item-name'>
                    {this.props.item.name}
                </span>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { user_id, authenticated } = reduxState
    return { user_id, authenticated }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListItemIcon))

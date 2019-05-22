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
        // size the item's image
        let default_image = 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png'
        let image = this.props.item.img_url ? this.props.item.img_url : default_image

        return(
            <div  className='list-single-item-in-list'  onClick={this.removeItemFromList}>
                <img className='list-item-image' src={image} alt={this.props.item.name}/>
                <div className='list-item-name'>
                    {this.props.item.name}
                    <i className="fas fa-trash"></i>
                </div>
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

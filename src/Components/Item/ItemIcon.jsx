import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ItemIcon extends Component{

    goToItem = () => {
        this.props.history.push(`/item/${this.props.item.item_id}`)
    }

    render(){
        // size the item's image

    let default_image = 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png'
    let image = this.props.item.img_url ? this.props.item.img_url : default_image


        return(
            <div className='item-item' onClick={this.goToItem}>
                <img className='item-image' src={image} alt={this.props.item.name}/>
                <div className='item-name'>
                    {this.props.item.name}
                    {/* <div>{this.props.item.name}</div> */}
                </div>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(ItemIcon))

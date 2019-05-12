import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class SingleItem extends Component{

    render(){
        return(
            <div>
            {this.props.item.name}
            {this.props.item.description}
            {this.props.item.weight}
            {this.props.item.volume}
            {this.props.item.type}
            {this.props.item.season}
            {this.props.item.activity}
            </div>
        )
    }
}

export default (withRouter(SingleItem))

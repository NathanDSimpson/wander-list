import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ListIcon extends Component{

    editList = () => {
        this.props.history.push(`/list/${this.props.list.list_id}`)
    }

    render(){
        return(
            <div className='single-list' onClick={this.editList}>
                <span className='list-name'>
                    {this.props.list.name}
                </span>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(ListIcon))
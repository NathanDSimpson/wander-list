import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class TripListIcon extends Component{

    goToList = () => {
        this.props.history.push(`/list/${this.props.list.list_id}`)
    }

    render(){
        return(
            <div onClick={this.goToList}>
                {this.props.list.name}
            </div>
        )
    }
}

export default connect(null, null)(withRouter(TripListIcon))
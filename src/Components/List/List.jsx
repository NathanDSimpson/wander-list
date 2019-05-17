import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class List extends Component{
    constructor(){
        super()
        this.state = {
            edit: false
        }
    }

    // get list items from db (use list_id from url params and user_id from redux)
    async componentWillMount() {
        try {
            const res = await axios.post('/api/list-items', { list_id: +this.props.match.params.id })
            const listItems = res.data
            console.log(`list-items from db:`, listItems)
        } catch(err){
            console.log(`Error: List.jsx - componentWillMount`)
        }
    }

    render(){
        return(
            <div>
                <span>
                    {/* {this.props.list.name} */}
                </span>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { user_id, lists } = reduxState
    return { user_id, lists }
}

export default connect(mapStateToProps, null)(withRouter(List))
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class EditItem extends Component{
    constructor(){
        super()
        this.state = {
            item_id: 0,
            user_id: 0,
            name: '',
            img_url: '',
            weight: 0,
            volume: 0,
            description: ''
        }
    }

    componentWillMount() {
        console.log(`<EditItem> constructor firing.`)
        // put the curent item info onto local state
        // pass this info via props (
        // async await with axios would work too but be slower)
        this.setState({

            })
    }

    async componentWillReceiveProps() {
        console.log(`componentWillReceiveProps running`)
        // re-render after submitting the edits
    }

    submitEdit = async () => {
        // submit to db via axios
        // submit to redux state via dispatch
    }

    toggle = () => {
        // go in and out of edit view
        // could also be done through routing
    }

    render(){
        return(
            <div>
                EDIT VIEW
            </div>
        )
    }
}

// const mapStateToProps = (reduxState) => {
//     const { items } = reduxState
//     return { items }
// }

const mapDispatchToProps = {
    submitEdit //not yet created in reducer
}
export default connect(null, submitEdit)(withRouter(EditItem))

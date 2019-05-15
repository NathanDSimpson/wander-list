import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import reducer from '../../redux/reducer';
import { jsxAttribute, file } from '@babel/types';

// 1: grab the current item info via props
// 2: allow edits and store on local state
// 3: send the changes to the db through axios
//     - create an endpoing in index js
//     - axios call in function in controller file
//  4: dispatch to redux to pull the updated items list from the db and put it on state
//      - through reducer function, CONST, and case


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
        // might use a different lifecycle if the info is pulled from state and not redux
    }

    submitEdit = async () => {
        // submit to db via axios
        // dispatch to the redux store to pull the updated items list for state from the db 
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

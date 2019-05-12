import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import AddItem from './AddItem'
import SingleItem from './SingleItem'

class Items extends Component{
    constructor(){
        super()
        this.state = {
            displayItems: []
        }
    }

    async componentWillUpdate(){ //run when props(redux store) or state updates
        if (this.props.user_id === 0){
            return
        } else{
            const res = await axios.post('/api/items', {user_id: this.props.user_id}) //get user's items from the db
            const items = res.data
            this.props.getItems(items) // 
            this.setState({
                displayItems: this.props.items
            })
        }
    }

    render(){
        return(
            <div>
                <AddItem/>
                {this.state.displayItems.map((item) => {
                    return <SingleItem
                            item={item}
                            key={item.id}
                            />
                })}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname, lastname, email, items, lists, trips } = reduxState
    return { authenticated, user_id, firstname, lastname, email, items, lists, trips }
}

// const mapDispatchToProps = {
//     loginUser,
//     getItems
// }

export default connect(mapStateToProps, null)(withRouter(Items))

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

    async componentWillMount() {
        if (this.props.user_id === 0){
            return
        }
        const res = await axios.post('/api/items', {user_id: this.props.user_id}) //get user's items from the db
        const items = res.data
        this.setState({
            displayItems: items
            })

    }

    async componentWillUpdate(nextProps, nextState) {
        console.log("Component will update", nextProps, nextState);

        if (this.props.user_id === 0){
            return
        }
        const res = await axios.post('/api/items', {user_id: this.props.user_id}) //get user's items from the db
        const items = res.data
        this.setState({
            displayItems: items
            })
    }

    render(){
        return(
            <div>
                <AddItem/>
                <section className='items'>
                    {this.state.displayItems.map((item) => {
                        return <SingleItem
                                item={item}
                                key={item.id}
                                />
                    })}
                </section>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname, lastname, email, items, lists, trips } = reduxState
    return { authenticated, user_id, firstname, lastname, email, items, lists, trips }
}

export default connect(mapStateToProps, null)(withRouter(Items))

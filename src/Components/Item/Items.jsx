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
            displayItems: [],
            addItemWizard: false
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


    // this is running infinitely
    // async componentDidUpdate(prevProps, prevState) {
    //     console.log(`NEXT PROPS`,prevProps, `NEXT STATE`, prevState)

    //     if (this.props.user_id === 0){
    //         return
    //     }
    //     const res = await axios.post('/api/items', {user_id: this.props.user_id}) //get user's items from the db
    //     const items = res.data
    //     this.setState({
    //         displayItems: items
    //         })
    // }

    toggleAdd = () => {
        this.setState({
            addItemWizard: !this.state.addItemWizard
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.toggleAdd}> {this.state.addItemWizard ? '- Collapse' : '+ Add Item'} </button>
                {this.state.addItemWizard ? <AddItem toggleAdd={this.toggleAdd}/> :                 
                    <section className='items'>
                    {this.state.displayItems.map((item) => {
                        return <SingleItem
                                item={item}
                                key={item.item_id}
                                />
                    })}
                    </section>}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname, lastname, email, items, lists, trips } = reduxState
    return { authenticated, user_id, firstname, lastname, email, items, lists, trips }
}

export default connect(mapStateToProps, null)(withRouter(Items))

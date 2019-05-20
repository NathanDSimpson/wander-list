import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ListIcon extends Component{
    constructor(){
        super()
        this.state = {
            showItems: false
        }
    }

    goToList = () => {
        this.props.history.push(`/list/${this.props.list.list_id}`)
    }

    toggleShowItems = () => {
        this.setState({
            showItems: !this.state.showItems
        })
    }

    render(){
        console.log(`this.props.list.items`, this.props.list.list_items)
        let items
        if (this.state.showItems){
            items = this.props.list.list_items.map( (item, index) => {
                return (
                    <li key={index}>{item.name}</li>
                )
            })
        }

        return(
            <div className='single-list'>
                <span onClick={this.goToList}> {this.props.list.name} </span>
                <ul className='list-name'>
                    <button onClick={this.toggleShowItems}>Expand List </button>
                    {items}
                </ul>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(ListIcon))
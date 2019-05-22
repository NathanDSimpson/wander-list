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
        let items
        if (this.state.showItems){
            items = this.props.list.list_items.map( (item, index) => {
                return (
                    <li key={index}>{item.name}</li>
                )
            })
        }

        let showItems
        this.state.showItems ? showItems = (<i className="fas fa-caret-down"></i>) : showItems = (<i className="fas fa-caret-right"></i>)

        return(
            <div>
                <span>
                    <span onClick={this.goToList} className='list-name' >
                        {this.props.list.name} 
                    </span>
                    <span onClick={this.toggleShowItems} >
                        {showItems} 
                    </span>
                </span>
                <ul className='list-items'>
                    {items}
                </ul>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(ListIcon))
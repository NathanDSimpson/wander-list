import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class List extends Component{
    constructor(){
        super()
        this.state = {
            edit: false,
            show_items: false
        }
    }

    toggle_show_items = () => {
        this.setState({
            show_items: !this.state.show_items
        })
    }

    render(){
        let temp  = this.props.lists.filter( list => list.list_id === +this.props.match.params.id)
        let list = temp[0]
        let items 
        if (this.state.show_items){
            items = list.list_items.map( item => {
                    return (
                        <div key={item.item_id}> 
                            {item.name}
                        </div>
                    )
            })
        }

        return(
            <div>
                <h2>
                    {list.name}
                    <button onClick={this.toggle_show_items}> Expand / Shrink </button>
                </h2>
                <div>
                    {items}
                </div>
                <div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = (reduxState) => {
    const { user_id, lists, authenticated } = reduxState
    return { user_id, lists, authenticated }
}

export default connect(mapStateToProps, null)(withRouter(List))
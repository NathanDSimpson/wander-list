import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class List extends Component{
    constructor(){
        super()
        this.state = {
            edit: false,
            list_id: 0,
            list_info: {},
            list_items: [],
            user_id: 0,
            authenticated: false,
            show_items: false
        }
    }

    async componentWillMount() {
        try {
            const res = await axios.post('/api/list-items', { list_id: +this.props.match.params.id })
            const listItems = res.data
            if (this.props.lists === []){
                this.props.history.push('/')
            } else {
                    let list_info = this.props.lists.filter((list) => {
                        return list.list_id === +this.props.match.params.id
                    })
                    this.setState({
                        list_id: +this.props.match.params.id,
                        list_items: listItems,
                        list_info: list_info[0]
                    })
            }
        } catch(err){
            console.log(`Error: List.jsx - componentWillMount`)
        }
    }

    toggle_show_items = () => {
        this.setState({
            show_items: !this.state.show_items
        })
    }


    render(){
        let items 
        if (this.state.show_items){
            items = this.state.list_items.map((item) => {
                return (
                    <div key={item.item_id}> 
                        {item.name}
                    </div>
                )
            })
        }
        console.log(`this.state`, this.state)
        console.log(`this.props`, this.props)

        return(
            <div>
                <h2>
                    {this.state.list_info.name}
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
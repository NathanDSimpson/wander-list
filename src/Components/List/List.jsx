import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ItemIcon from '../Item/ItemIcon'
import ListEdit from './ListEdit'

class List extends Component{
    constructor(){
        super()
        this.state = {
            edit: false,
            show_items: true
        }
    }

    toggle_show_items = () => {
        this.setState({
            show_items: !this.state.show_items
        })
    }

    editList = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    render(){
        let temp  = this.props.lists.filter( list => list.list_id === +this.props.match.params.id)
        let list = temp[0]
        let items 
        if (this.state.show_items){
            items = list.list_items.map( item => {
                    return (
                        <ItemIcon
                            key={item.item_id}
                            item={item}
                            > 
                            {item.name}
                        </ItemIcon>
                    )
            })
        }

        let list_header
        if (this.state.edit){
            list_header = (
                <div>
                    <button onClick={this.editList}> Toggle Edit </button>
                    <div>edit</div>
                    <ListEdit
                        list={list}
                        toggleEdit={this.editList}
                    ></ListEdit>
                </div>
            )
        } else {
            list_header = (
                <div>
                    <h2>
                        {list.name}
                        <button onClick={this.toggle_show_items}> Expand / Shrink </button>
                        <button onClick={this.editList}> Edit </button>
                    </h2>
                    <h5>
                        {list.description}
                    </h5>
                </div>
            )
        }

        return(
            <div>
                <div>
                    {list_header}
                </div>
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
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ListItemIcon from './ListItemIcon'
import ListEdit from './ListEdit'
import ItemWizard from './ItemWizard'
import {getUserData} from '../../redux/reducer'

class List extends Component{
    constructor(){
        super()
        this.state = {
            edit: false,
            show_items: true,
            add_items: false
        }
    }

    toggle_show_items = () => {
        this.setState({
            show_items: !this.state.show_items
        })
    }

    toggleAddItems = () => {
        this.setState({
            add_items: !this.state.add_items
        })
    }

    editList = () => {
        this.setState({
            edit: !this.state.edit
        })
    }


    deleteList = async () =>{
        this.props.history.push('/lists') 
        try {
            //delete from db
            await axios.post('/api/delete-list', { list_id: +this.props.match.params.id }) 
            //get updated info from db
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // update redux
            this.props.getUserData(res.data)
        } catch(err){
            alert(`List.jsx: deleteList`)
            }
        }

    render(){
        let temp  = this.props.lists.filter( list => list.list_id === +this.props.match.params.id)
        let list = temp[0]
        let items 
        if (this.state.show_items){
            items = list.list_items.map( (item, index) => {
                    return (
                        <ListItemIcon
                            key={index}
                            item={item}
                            > 
                            {item.name}
                        </ListItemIcon>
                    )
            })
        }

        let list_display
        if (this.state.edit){
            list_display = (
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
            list_display = (
                <div>
                    <h2>
                        {list.name}
                        <button onClick={this.toggle_show_items}> Expand / Shrink </button>
                        <button onClick={this.toggleAddItems}> Toggle Add Items </button>
                        <button onClick={this.editList}> Edit </button>
                        <button onClick={this.deleteList}> Delete </button>

                    </h2>
                    <h5>
                        {list.description}
                    </h5>
                </div>
            )
        }
        let add_item_wizard
        if (this.state.add_items){
            add_item_wizard = (
                <ItemWizard ></ItemWizard>
            )
        }

        return(
            <div>
                <div>
                    {list_display}
                </div>
                <div>
                    {items}
                </div>
                <div>
                    {add_item_wizard}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (reduxState) => {
    const { user_id, lists, authenticated } = reduxState
    return { user_id, lists, authenticated }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List))
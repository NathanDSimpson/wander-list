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
        }
    }

    componentWillMount() {
        if (this.props.lists.length === 0){
            this.props.history.push('/lists')
        }
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
        if (this.props.lists.length === 0){
            return null
        }

        let temp  = this.props.lists.filter( list => list.list_id === +this.props.match.params.id)
        let list = temp[0]
        let items = list.list_items.map( (item, index) => {
            return (
                <div key={index}>
                    <ListItemIcon item={item}> 
                        {item.name}
                    </ListItemIcon>
                </div>
            )
            })

        let list_display
        if (this.state.edit){
            list_display = (
                <div>
                    <button onClick={this.editList}> <i className="fas fa-angle-left"></i> </button>
                    <ListEdit
                        list={list}
                        toggleEdit={this.editList}
                    ></ListEdit>
                </div>
            )
        } else {
            list_display = (
                <div className='list-display'>
                    <h2 className='list-info'>
                        <span>
                            {list.name}
                        </span>
                        <button onClick={this.editList}> <i className="fas fa-edit"></i> </button>
                        <button onClick={this.deleteList}> <i className="fas fa-trash"></i></button>
                    </h2>
                    <div className='list-description'>
                        {list.description}
                    </div>
                </div>
            )
        }        

        return(
            <div className='list'>
                <div>
                    {list_display}
                </div>
                <span>
                    <section className='list-items-in-list'>
                        {items}
                    </section>
                    <div>
                        <ItemWizard ></ItemWizard>
                    </div>
                </span>
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
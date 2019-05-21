import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addItem, getItems, getUserData } from '../../redux/reducer'

class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            img_url: '',
            description: '',
            weight: 0,
            volume: 0,
            tags: ''
        }
    }

    // track user inputs via local state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    // submit from local state to the db, then update redux state with the db response
    handleSubmit = async (event) => {
        event.preventDefault()
        const { name, img_url, description, weight, volume, tags } = this.state
        try {
            // add to db
            await axios.post('/api/add-item', { user_id: this.props.user_id, name, img_url, description, weight, volume, tags }) 
            // get updated info from db for redux
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // update redux
            this.props.getUserData(res.data) 
        } catch(err){
            alert(`AddItem.jsx: handleSubmit`)
        }
        this.props.toggleAdd() // passed as props from Items.jsx to toggle this component
    }

    render(){
        return(
            <>
            <div className='add-item-form'>
                <form onSubmit={this.handleSubmit}> 
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='name' 
                        placeholder='Name'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='img_url' 
                        placeholder='Image URL'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='weight' 
                        placeholder='Weight (lbs)'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='volume' 
                        placeholder='Volume (L)'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='tags' 
                        placeholder='Hashtags #'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='description' 
                        placeholder='Description'
                    />
                    <button> Add Item </button>
                </form>
            </div>
            </>
        )
    }

}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id } = reduxState
    return { authenticated, user_id } 
}

const mapDispatchToProps = {
    addItem,
    getItems,
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddItem))

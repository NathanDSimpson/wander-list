import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addItem, getItems } from '../../redux/reducer'

class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            img_url: '',
            description: '',
            weight: 0,
            volume: 0,
            tags: []
        }
    }

    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.props.toggleAdd()
        const { name, img_url, description, weight, volume } = this.state
        try {
            //send item to db
            const res = await axios.post('/api/add-item', { user_id: this.props.user_id, name, img_url, description, weight, volume }) 
            //get updated items list from db
            // const res = await axios.post('/api/items', {user_id: this.props.user_id})
            const items = res.data
            // send updated items to redux state
            this.props.getItems(items)
        } catch(err){
            // display an error message
        }
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
                    <button> Add to library </button>
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
    getItems
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddItem))

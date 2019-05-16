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
        this.props.toggleAdd() // passed as props from Items.jsx to toggle this component
        const { name, img_url, description, weight, volume } = this.state
        try {
            const res = await axios.post('/api/add-item', { user_id: this.props.user_id, name, img_url, description, weight, volume }) 
            const items = res.data
            this.props.getItems(items) // update redux state by sending new items list
        } catch(err){
            alert(`AddItem.jsx: handleSubmit`)
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

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addItem } from '../../redux/reducer'

class AddItem extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            serial_number: '',
            img_url: '',
            description: '',
            weight: 0,
            volume: 0,
            category: '',
            season: '',
            activity: '',
        }
    }

    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const { name, serial_number, img_url, description, weight, volume, category, season, activity } = this.state
        try {
            await axios.post('/api/add-item', { user_id: this.props.user_id, name, serial_number, img_url, description, weight, volume, category, season, activity }) 
            // this.props.addItem({ id, firstname, lastname, email, authenticated: true })// dispatch to store
        } catch(err){
            // display an error message
        }
    }

    render(){
        // console.log(`Props for <AddItem>`, this.props)
        return(
            <>
                <h3>Add a new item to your library:</h3>
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
                        name='serial_number' 
                        placeholder='Serial Number'
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
                        name='description' 
                        placeholder='Description'
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
                        name='category' 
                        placeholder='Category'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='season' 
                        placeholder='Season'
                    />
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='activity' 
                        placeholder='Activity'
                    />
                    <button> Add to library </button>
                </form>
            </>
        )
    }

}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id } = reduxState
    return { authenticated, user_id } 
}

const mapDispatchToProps = {
    addItem
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddItem))

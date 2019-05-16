import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { getItems } from '../../redux/reducer'

class Edit extends Component{
    constructor(){
        super()
        this.state = {
            item_id: 0,
            user_id: 0,
            name: '',
            img_url: '',
            weight: 0,
            volume: 0,
            description: '',
            edit: false
        }
    }

    // use the URL params to find the right item in redux, then add that item to local state
    componentWillMount() {
        console.log(`Edit.jsx: componentWillMount`)
        const item = this.props.items.filter( //filter redux items lists to match the URL param to the item_id
            (i) => {
            return i.item_id === +this.props.match.params.id 
        })
        const { description, img_url, item_id, name, user_id, volume, weight } = item[0]
        this.setState({ description, img_url, item_id, name, user_id, volume, weight })
    }

    async componentWillReceiveProps() {
        console.log(`Edit.jsx: componentWillReceiveProps. (This function currently does nothing at all.)`)
    }

    // delete item from db, get updated items list from db and send to redux
    deleteItem = async () => {
        const { item_id, user_id } = this.state
        try {
            const res = await axios.post('/api/delete', {item_id, user_id }) //delete from db
            const updatedItemsList = res.data // db returns updated items list
            this.props.getItems(updatedItemsList)  //dispatch new items to redux
            this.props.history.push('/items') // navigate user back to items view
        } catch(err){
            alert(`Edit.jsx: deleteItem`)
        }
    }

    // send updated item info to db, get updated items list from db and send to redux
    submitEdit = async (event) => {
        event.preventDefault()
        this.toggle() // toggle out of editView after submitting
        const { name, img_url, weight, volume, description, item_id, user_id } = this.state
        try {
            const res = await axios.put('/api/edit-item', { name, img_url, weight, volume, description, item_id, user_id }) //send updates to db
            const items = res.data // db returns updated items list
            this.props.getItems(items) // dispatch new items list to redux
        } catch(err){
            alert('Edit.jsx: submitEdit')
        }
    }

    // keep track of user inputs via state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
       
    // toggle edit view
    toggle = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    // back to items view
    backButton = () => {
        this.props.history.push('/items')
    }

    render(){
        //conditionally render the edit view
        let display = ''
        if (!this.state.edit){
            display = (
            <div>
                 <div>
                    <button onClick={this.backButton}>  BACK </button>
                </div>
                <h3>NAME:{this.state.name}</h3>
                <div>IMAGE URL:{this.state.img_url}</div>
                <div>WEIGHT (pounds):{this.state.weight}</div>
                <div>VOLUME (L):{this.state.volume}</div>
                <div>DETAILS:{this.state.description}</div>
                <div>
                <button onClick={this.toggle}> EDIT </button>
                <button onClick={this.deleteItem}> DELETE </button>
                </div>
            </div>
            )
        } else {
            display = (
                <div>
                    <button onClick={this.toggle}>  BACK </button>
                    <form onSubmit={this.submitEdit}> 
                        NAME:
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='name' 
                            value={this.state.name}
                            />
                        IMAGE URL:
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='img_url' 
                            value={this.state.img_url}
                            />
                        WEIGHT (pounds):
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='weight' 
                            value={this.state.weight}
                            />
                        VOLUME (liters):
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='volume' 
                            value={this.state.volume}
                            />
                        DETAILS:
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='description' 
                            value={this.state.description}
                            />
                        HASHTAGS:
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='tags' 
                            value='Hashtags (#)'
                            />
                        <button> Submit Changes </button>
                    </form>
                 </div>
            )
        }

        return(
            <div>
                {display}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { items } = reduxState
    return { items }
}

const mapDispatchToProps = {
    getItems
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))

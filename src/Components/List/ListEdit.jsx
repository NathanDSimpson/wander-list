import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../../redux/reducer'

class ListEdit extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            list_id: 0
        }
    }

    componentWillMount(){
        this.setState({
            name: this.props.list.name,
            description: this.props.list.description,
            list_id: this.props.list.list_id
        })
    }

    // keep track of user inputs via state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    // submit the edits
    handleSubmit = async (event) => {
        event.preventDefault()
        this.props.toggleEdit()
        const { name, description} = this.state
        try {
            // send edits to db
            await axios.put('/api/edit-list', {list_id: this.state.list_id, name, description})
            // get updated info from db
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // dispatch new info to redux
            this.props.getUserData(res.data)

        } catch(err){
            alert(`ListEdit.jsx: handleSubmit`)
        }

    }

    // submitEdit = async (event) => {
    //     event.preventDefault()
    //     this.toggle() // toggle out of editView after submitting
    //     const { name, img_url, weight, volume, description, item_id} = this.state
    //     try {
    //         //send updates to db
    //         await axios.put('/api/edit-item', { name, img_url, weight, volume, description, item_id }) 
    //         // get updated info from db and send to redux
    //         const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
    //         this.props.getUserData(res.data)
    //     } catch(err){
    //         alert('Edit.jsx: submitEdit')
    //     }
    // }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}> 
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
                        name='description' 
                        value={this.state.description}
                        />                
                    <button> Submit Changes </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { user_id, authenticated } = reduxState
    return { user_id, authenticated }
}

const mapDispatchToProps = {
    getUserData
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListEdit))
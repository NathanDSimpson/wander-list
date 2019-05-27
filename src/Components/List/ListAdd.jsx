import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../../redux/reducer'
import Swal from 'sweetalert2'


class ListEdit extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            user_id: 0
        }
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
        this.props.toggleAdd() 
        const { name, description} = this.state
        try {
            // send edits to db
            await axios.post('/api/add-list', {user_id: this.props.user_id, name, description})
            // get updated info from db
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // dispatch new info to redux
            this.props.getUserData(res.data)
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'List added successfully!',
                showConfirmButton: false,
                timer: 1500
              })

        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Problem adding the list'
              })        
        }

    }
    
    render(){
        return(
            <div>
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
                        name='description' 
                        placeholder='Description'
                        />                
                    <button> Add List </button>
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
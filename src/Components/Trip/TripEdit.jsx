import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../../redux/reducer'
import Swal from 'sweetalert2'

// import into trip.jsx and conditionally render
// pass trip as props from parent 
// pass toggle edit as props from parent
// create axios endpoint and controller function
// create db sql file

class TripEdit extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            description: '',
            trip_id: 0
        }
    }

    componentWillMount(){
        this.setState({
            name: this.props.trip.name,
            description: this.props.trip.description,
            trip_id: this.props.trip.trip_id
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
            await axios.put('/api/edit-trip', {trip_id: this.state.trip_id, name, description})
            // get updated info from db
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            // dispatch new info to redux
            this.props.getUserData(res.data)
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: 'Trip edited successfully!',
                showConfirmButton: false,
                timer: 1500
              })
        } catch(err){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'We are having trouble submitting your edits.'
              })  
            }
    }
    
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
                    Description:
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TripEdit))
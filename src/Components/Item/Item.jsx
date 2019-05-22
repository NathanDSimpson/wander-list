import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { getUserData } from '../../redux/reducer'

class Item extends Component{
    constructor(){
        super()
        this.state = {
            item_id: 0,
            name: '',
            img_url: '',
            description: '',
            tags: '',
            edit: false
        }
    }

    // put the item info onto local state so we can edit and then submit to the db
    componentWillMount() {
        if (this.props.items.length === 0){
            this.props.history.push('/items')
        } else{
            const temp = this.props.items.filter(item => item.item_id === +this.props.match.params.id)
            const item = temp[0]
            const {item_id, name, description, tags } = item
            const img_url = item.img_url === null ? '' : item.img_url
            this.setState({ 
                img_url, 
                item_id, 
                name, 
                description,
                tags
            })
        }
    }

    


    // delete item from db, get updated items list from db and send to redux
    deleteItem = async () => {
        // navigate user back to items view
        this.props.history.push('/items') 
        try {
            //delete from db
            await axios.post('/api/delete', { item_id: +this.props.match.params.id }) 
            // get updated info from db and send to redux
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            this.props.getUserData(res.data)
        } catch(err){
            alert(`Edit.jsx: deleteItem`)
        }
    }

    // send updated item info to db, get updated items list from db and send to redux
    submitEdit = async (event) => {
        event.preventDefault()
        this.toggle() // toggle out of editView after submitting
        const { name, img_url, description, item_id, tags} = this.state
        try {
            //send updates to db
            await axios.put('/api/edit-item', { name, img_url, description, item_id, tags }) 
            // get updated info from db and send to redux
            const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
            this.props.getUserData(res.data)
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
        // avoid error
        if (this.props.items.length === 0){
            return null
        } 

        console.log(`what the fuck`)

        //conditionally render the edit view
        const temp = this.props.items.filter(item => item.item_id === +this.props.match.params.id)
        const item = temp[0]
        let default_image = 'http://savings.gov.pk/wp-content/plugins/ldd-directory-lite/public/images/noimage.png'
        const image_url = item.img_url === null || item.img_url === '' ? default_image : item.img_url
        
        let display = ''
        if (!this.state.edit){
            display = (
            <div>
                <div>
                    <button className='back-button' onClick={this.backButton}>  <i className="fas fa-angle-left"></i> </button>
                </div>
                <div className='item-page'>
                    <div className='item-title'>
                        <span>{item.name}</span>
                        <i onClick={this.toggle}> <i className="fas fa-edit"></i> </i>
                        <i onClick={this.deleteItem}> <i className="fas fa-trash-alt"></i> </i>
                    </div>
                    <div className='image-container'>
                        <img className='image' src={image_url} alt={item.name}/>
                    </div>
                    <div>{item.img_url}</div>
                    <div>{item.description}</div>
                    <div>{item.tags}</div>
                    <div>
                    </div>
                </div>
            </div>
            )
        } else {
            display = (
                <div>
                    <button onClick={this.toggle}>  <i className="fas fa-angle-left"></i> </button>
                    <form onSubmit={this.submitEdit}> 
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='name'
                            placeholder='Name' 
                            value={this.state.name}
                            />
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='img_url' 
                            placeholder='Image URL' 
                            value={this.state.img_url}
                            />
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='description' 
                            placeholder='Description' 
                            value={this.state.description}
                            />
                        <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='tags' 
                            placeholder='Tags' 
                            value={this.state.tags}
                            />
                        <button> Submit </button>
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
    const { authenticated, user_id, items } = reduxState
    return { authenticated, user_id, items }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Item))

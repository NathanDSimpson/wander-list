import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
// import axios from 'axios'

// 0: create route to edit item
// 1: grab the current item info via props
// 2: allow edits and store on local state
// 3: send the changes to the db through axios
//     - create an endpoing in index js
//     - axios call in function in controller file
//  4: dispatch to redux to pull the updated items list from the db and put it on state
//      - through reducer function, CONST, and case


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

    componentWillMount() {
        console.log(`<EditItem> constructor firing.`)
        const item = this.props.items.filter(
            (i) => {
                // console.log(`item.item_id:`, item.item_id, `+this.props.match.params.id:`, +this.props.match.params.id)
            return i.item_id === +this.props.match.params.id
        })
        const { description, img_url, item_id, name, user_id, volume, weight } = item[0]
        this.setState({ 
            description, 
            img_url, 
            item_id, 
            name, 
            user_id, 
            volume, 
            weight
        })
    }

    async componentWillReceiveProps() {
        console.log(`componentWillReceiveProps running`)
        // re-render after submitting the edits
        // might use a different lifecycle if the info is pulled from state and not redux
    }

    submitEdit = async (event) => {
        event.preventDefault()
        this.toggle()

        // submit to db via axios
        // dispatch to the redux store to pull the updated items list for state from the db 
    }

    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    toggle = () => {
        // go in and out of edit view
        // could also be done through routing
        this.setState({
            edit: !this.state.edit
        })
    }

    render(){
        console.log(`Rendering <Edit>`)
        let display = ''
        if (!this.state.edit){
            display = (
            <div>
                 <div>
                    <button>  BACK </button>
                    <button onClick={this.toggle}> EDIT </button>
                </div>
                <h3>NAME:{this.state.name}</h3>
                <div>IMAGE URL:{this.state.img_url}</div>
                <div>WEIGHT (pounds):{this.state.weight}</div>
                <div>VOLUME (L):{this.state.volume}</div>
                <div>DETAILS:{this.state.description}</div>
            </div>
           
            )
        } else {
            display = (
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
                    placeholder={this.state.img_url}
                />
                WEIGHT (pounds):
                <input 
                    onChange={this.handleInput} 
                    type="text" 
                    name='weight' 
                    placeholder={this.state.weight}
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

// const mapDispatchToProps = {
//     submitEdit //not yet created in reducer
// }

export default connect(mapStateToProps, null)(withRouter(Edit))

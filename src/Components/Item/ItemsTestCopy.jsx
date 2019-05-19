import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddItem from './AddItem'
import ItemIcon from './ItemIcon'

class Items extends Component{
    constructor(){
        super()
        this.state = {
            addItemWizard: false,
            filterItems: false,
            filterValue: ''
        }
    }

    toggleAdd = () => {
        this.setState({
            addItemWizard: !this.state.addItemWizard
        })
    }

    toggleFilter = () => {
        this.setState({
            filterItems: !this.state.filterItems
        })
    }

    // track user inputs via local state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        let icons
        // filter our items
        if (this.state.filterItems){
            let filteredItems = this.props.items.filter( item =>  {
                // account for case-sensitivity
                let filter_lowercase = this.state.filterValue.toLowerCase()
                let name_lowercase = item.name.toLowerCase()
                let tags_lowercase = item.tags.toLowerCase()
                return name_lowercase.includes(filter_lowercase) || tags_lowercase.includes(filter_lowercase)
                })
            // map the list into components
            icons = filteredItems.map((item) =>  <ItemIcon item={item} key={item.item_id}/> )
        } else {
            icons = this.props.items.map((item) =>  <ItemIcon item={item} key={item.item_id}/> )
        }
        
        return(
            <div>
                <button onClick={this.toggleAdd}> {this.state.addItemWizard ? '- Collapse' : '+ Add Item'} </button>
                <button onClick={this.toggleFilter}> Toggle Filter: {this.state.toggleFilter} </button>
                <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='filterValue' 
                        placeholder='filter value'
                    />
                {this.state.addItemWizard ? <AddItem toggleAdd={this.toggleAdd}/> : <section className='items'> {icons} </section>}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, items } = reduxState
    return { authenticated, items }
}

export default connect(mapStateToProps, null)(withRouter(Items))
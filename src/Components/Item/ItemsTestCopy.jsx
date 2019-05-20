import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddItem from './AddItem'
import ItemIcon from './ItemIcon'

class Items extends Component{
    constructor(){
        super()
        this.state = {
            addItem: false,
            searchValue: ''
        }
    }

    toggleAdd = () => {
        this.setState({
            addItem: !this.state.addItem
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
        let filteredItems = this.props.items.filter( item =>  {
            // account for case-sensitivity
            let filter_lowercase = this.state.searchValue.toLowerCase()
            let name_lowercase = item.name.toLowerCase()
            let tags_lowercase = item.tags.toLowerCase()
            return name_lowercase.includes(filter_lowercase) || tags_lowercase.includes(filter_lowercase)
            })
        // map the list into components
        let icons = filteredItems.map((item) =>  <ItemIcon item={item} key={item.item_id}/> )

        let backButton = (<i className="fas fa-chevron-left"></i>)
        let addButton = (<i className="fas fa-plus">  Item</i>)
  
        let search
            if (!this.state.addItem){
                search = (
                    <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='searchValue' 
                        placeholder='Search'
                    />
                )            
            }

        return(
            <div>
                <button onClick={this.toggleAdd}> {this.state.addItem ? backButton : addButton} </button>
                {search}
                {this.state.addItem ? <AddItem toggleAdd={this.toggleAdd}/> : <section className='items'> {icons} </section>}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, items } = reduxState
    return { authenticated, items }
}

export default connect(mapStateToProps, null)(withRouter(Items))
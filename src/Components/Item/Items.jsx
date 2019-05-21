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
        let items
        if (this.state.searchValue === ''){
            items = this.props.items
        } else {
            items = this.props.items.filter( item =>  {
                let filter_lowercase = this.state.searchValue.toLowerCase()
                let description_lowercase = item.description.toLowerCase()
                let name_lowercase = item.name.toLowerCase()
                let tags_lowercase = item.tags.toLowerCase()
                return (
                    name_lowercase.includes(filter_lowercase) 
                    || tags_lowercase.includes(filter_lowercase) 
                    || description_lowercase.includes(filter_lowercase)
                )
                })
        }
        let icons = items.map((item) =>  <ItemIcon item={item} key={item.item_id}/> )

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
                <div className='items-nav'>
                    <button onClick={this.toggleAdd}> {this.state.addItem ? backButton : addButton} </button>
                    {search}
                </div>
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
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../../redux/reducer'
import ItemWizardIcons from './ItemWizardIcon'

class ItemWizard extends Component{
    constructor(){
        super()
        this.state = {
            filter: false,
            filterValue: ''
        }
    }

    toggleFilter = () => {
        this.setState({
            filter: !this.state.filter
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
        // filter our items
        if (this.state.filter){
            let filteredItems = this.props.items.filter( item =>  {
                // account for case-sensitivity
                let filter_lowercase = this.state.filterValue.toLowerCase()
                let name_lowercase = item.name.toLowerCase()
                let tags_lowercase = item.tags.toLowerCase()
                return name_lowercase.includes(filter_lowercase) || tags_lowercase.includes(filter_lowercase)
                })
            // map the list into components
            items = filteredItems.map(item => <ItemWizardIcons key={item.item_id} item={item} > </ItemWizardIcons>)
        } else {
            items = this.props.items.map(item => <ItemWizardIcons key={item.item_id} item={item} > </ItemWizardIcons>)
        }

        return(
            <div>
                ItemWizard
                <button onClick={this.toggleFilter}> Toggle Filter </button>
                <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='filterValue' 
                        placeholder='filter value'
                    />
                {items}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { user_id, items, authenticated } = reduxState
    return { user_id, items,  authenticated }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemWizard))
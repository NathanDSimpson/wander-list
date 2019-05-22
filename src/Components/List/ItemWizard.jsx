import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../../redux/reducer'
import ItemWizardIcons from './ItemWizardIcon'

class ItemWizard extends Component{
    constructor(){
        super()
        this.state = {
            filterValue: ''
        }
    }

    // track user inputs via local state
    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    
    render(){
        let items_list
        // filter our items
        if (this.state.filterValue !== ''){
            items_list = this.props.items.filter( item =>  {
                let searchFor = this.state.filterValue.toLowerCase()
                let searchIn = item.description ? item.description.toLowerCase() : ''
                searchIn += item.name ? item.name.toLowerCase() : ''
                searchIn += item.tags ? item.tags.toLowerCase() : ''
                return searchIn.includes(searchFor) 
            })
        } else {
            items_list = this.props.items
        }
        let items = items_list.map((item, index) => (
            <li key={item.item_id}>
                <ItemWizardIcons item={item} > </ItemWizardIcons>
            </li>
        ))
        
        return(
            <div className='lists-item-wizard'>
                <div className='lists-item-wizard-header'>
                    <span > Add Items:</span>
                    <input 
                            onChange={this.handleInput} 
                            type="text" 
                            name='filterValue' 
                            placeholder='Search'
                        />
                </div>
                <ul className='lists-item-wizard-items'>
                    {items}
                </ul>
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
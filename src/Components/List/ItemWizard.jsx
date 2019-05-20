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
                let filter_lowercase = this.state.filterValue.toLowerCase()
                let description_lowercase = item.description.toLowerCase()
                let name_lowercase = item.name.toLowerCase()
                let tags_lowercase = item.tags.toLowerCase()
                return (
                    name_lowercase.includes(filter_lowercase) 
                    || tags_lowercase.includes(filter_lowercase) 
                    || description_lowercase.includes(filter_lowercase)
                )                
            })
        } else {
            items_list = this.props.items
        }
        let items = items_list.map(item => <ItemWizardIcons key={item.item_id} item={item} > </ItemWizardIcons>)
        
        return(
            <div>
                <input 
                        onChange={this.handleInput} 
                        type="text" 
                        name='filterValue' 
                        placeholder='Search'
                    />
                <div>
                    {items}
                </div>
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
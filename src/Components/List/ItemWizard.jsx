import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../../redux/reducer'
import ItemWizardIcons from './ItemWizardIcon'

class ItemWizard extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    
    render(){

        let items = this.props.items.map(item => {
            return (
                <ItemWizardIcons key={item.item_id} item={item} > </ItemWizardIcons>
            )
        })

        return(
            <div>
                ItemWizard
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
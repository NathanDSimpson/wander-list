import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUserData } from '../../redux/reducer'


class ItemWizardIcon extends Component{

    addToList = async () => {
        await axios.post('/api/add-list-item', {item_id: this.props.item.item_id, list_id: +this.props.match.params.id })
        const res = await axios.post('/api/user-data', {user_id: this.props.user_id})
        this.props.getUserData(res.data)
    }

    render(){
        return(
            <div onClick={this.addToList}>
                {this.props.item.name}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { user_id, authenticated } = reduxState
    return { user_id,  authenticated }
}

const mapDispatchToProps = {
    getUserData
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ItemWizardIcon))


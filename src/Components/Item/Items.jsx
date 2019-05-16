import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddItem from './AddItem'
import Icon from './Icon'

class Items extends Component{
    constructor(){
        super()
        this.state = {
            addItemWizard: false
        }
    }

    toggleAdd = () => {
        this.setState({
            addItemWizard: !this.state.addItemWizard
        })
    }

    render(){
        // map over items list for rendering
        let icons
        if (this.props.authenticated){ //make sure our user is logged in
            icons = this.props.items.map((item) => {
                return <Icon item={item} key={item.item_id}/>
            })
        }else {
            alert(`Please log in to access your items. (Items.jsx: componentWillMount)`)
        }

        return(
            <div>
                <button onClick={this.toggleAdd}> {this.state.addItemWizard ? '- Collapse' : '+ Add Item'} </button>
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

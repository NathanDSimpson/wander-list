import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AddItem from './AddItem'
import ItemIcon from './ItemIcon'

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
        let icons = this.props.items.map((item) =>  <ItemIcon item={item} key={item.item_id}/> )
        
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

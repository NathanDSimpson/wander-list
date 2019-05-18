import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ListIcon from './ListIcon'

class Lists extends Component{
    constructor(){
        super()
        this.state = {
            addListWizard: false
        }
    }

    toggleAdd = () => {
        this.setState({
            addListWizard: !this.state.addListWizard
        })
    }

    goToList = (id) => {
        this.props.history.push(`/list/${id}`)
    }

    render(){

        let icons = this.props.lists.map((list) =>  <ListIcon list={list} key={list.list_id}/> )

        return(
            <div>
                <button onClick={this.toggleAdd}> 
                    {this.state.addListWizard ? '- Collapse' : '+ Add List'} 
                </button>
                <section>
                    {icons}
                </section>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, lists } = reduxState
    return { authenticated, user_id, lists }
}

export default connect(mapStateToProps, null)(withRouter(Lists))
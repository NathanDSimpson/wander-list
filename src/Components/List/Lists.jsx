import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ListIcon from './ListIcon'
import ListAdd from './ListAdd'

class Lists extends Component{
    constructor(){
        super()
        this.state = {
            add_list: false
        }
    }

    toggleAdd = () => {
        this.setState({
            add_list: !this.state.add_list
        }) 
    }

    render(){

        let icons = this.props.lists.map((list) =>  <ListIcon list={list} key={list.list_id}/> )

        let display
        if (!this.state.add_list){
            display = icons
        }
        else {
            display = (
                <ListAdd toggleAdd={this.toggleAdd}> </ListAdd>
            )
        }

        let buttonIcon
        if (this.state.add_list){
            buttonIcon = (<i className="fas fa-chevron-left"></i>)
        }else{
            buttonIcon = (<i className="fas fa-plus">  List</i>)
        }
        
        
        return(
            <div>
                <button onClick={this.toggleAdd}> 
                    {buttonIcon}
                </button>
                <section>
                    {display}
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
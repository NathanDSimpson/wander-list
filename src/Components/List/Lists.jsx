import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ListIcon from './ListIcon'
import ListAdd from './ListAdd'

class Lists extends Component{
    constructor(){
        super()
        this.state = {
            add_list: false,
            searchValue: ''
        }
    }

    handleInput = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    toggleAdd = () => {
        this.setState({
            add_list: !this.state.add_list
        }) 
    }

    render(){
        let icons 
        let filtered
        if (this.state.searchValue === ''){
            filtered = this.props.lists
        } else {
            filtered = this.props.lists.filter( list =>  {
                let filter_lowercase = this.state.searchValue.toLowerCase()
                let description_lowercase = list.description.toLowerCase()
                let name_lowercase = list.name.toLowerCase()
                return (name_lowercase.includes(filter_lowercase) || description_lowercase.includes(filter_lowercase))
                })  
            }

        icons = filtered.map((list) =>  <ListIcon list={list} key={list.list_id}/> )
        
        let addList= <ListAdd toggleAdd={this.toggleAdd}> </ListAdd>
    

        let buttonIcon
        if (this.state.add_list){
            buttonIcon = (<i className="fas fa-chevron-left"></i>)
        }else{
            buttonIcon = (<i className="fas fa-plus"> <span className='add-button' >List</span></i>)
        }

        let search
        if (!this.state.add_list){
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
            <div className='lists'>
                <div className='lists-nav'>
                    <div className='add-button' onClick={this.toggleAdd}> 
                        {buttonIcon}
                    </div>
                    <span>
                        {search}
                    </span>
                </div>
                <div>
                    {this.state.add_list ? addList : null}
                </div>
                <div className='list-icons'>
                    {!this.state.add_list ? icons : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, lists } = reduxState
    return { authenticated, user_id, lists }
}

export default connect(mapStateToProps, null)(withRouter(Lists))
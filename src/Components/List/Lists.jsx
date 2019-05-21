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
        if (this.state.searchValue === ''){
            icons = this.props.lists.map((list) =>  <ListIcon list={list} key={list.list_id}/> )
        } else {
            let filtered = this.props.lists.filter( list =>  {
                console.log(`list`, list)
                let filter_lowercase = this.state.searchValue.toLowerCase()
                let description_lowercase = list.description.toLowerCase()
                let name_lowercase = list.name.toLowerCase()
                return (name_lowercase.includes(filter_lowercase) || description_lowercase.includes(filter_lowercase))
                })
            icons = filtered.map((list) =>  <ListIcon list={list} key={list.list_id}/> )

        }

        console.log(`icons`, icons)
        
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
            <div>
                <span>
                    <div onClick={this.toggleAdd}> 
                        {buttonIcon}
                    </div>
                    {search}
                </span>
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
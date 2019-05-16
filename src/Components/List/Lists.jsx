import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Lists extends Component{
    constructor(){
        super()
        this.state = {
            displayLists: [],
            addListWizard: false
        }
    }

    async componentWillMount() {
        console.log(`<Lists> constructor.`)
        if (this.props.user_id === 0){
            return
        }
        // const res = await axios.post('/api/items', {user_id: this.props.user_id}) //get user's items from the db
        // const lists = res.data
        // this.setState({
        //     displayLists: lists
        //     })
    }

    async componentWillReceiveProps() {
        console.log(`<Lists> componentWillReceiveProps`)

        if (this.props.user_id === 0){
            return
        }
        // const res = await axios.post('/api/items', {user_id: this.props.user_id}) //get user's items from the db
        // const lists = res.data
        // this.setState({
        //     displayLists: lists
        //     })
    }

    toggleAdd = () => {
        this.setState({
            addListWizard: !this.state.addListWizard
        })
    }

    render(){

        return(
            <div>
                <button onClick={this.toggleAdd}> {this.state.addListWizard ? '- Collapse' : '+ Add Item'} </button>
                {/* {this.state.addListWizard ? <AddList toggleAdd={this.toggleAdd}/> :                  */}
                    <section className='lists'>
                    {this.state.displayLists.map((list) => {
                            return <div>{list.name}</div>
                    })}
                    </section>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    const { authenticated, user_id, firstname, lastname, email, items, lists, trips } = reduxState
    return { authenticated, user_id, firstname, lastname, email, items, lists, trips }
}

export default connect(mapStateToProps, null)(withRouter(Lists))
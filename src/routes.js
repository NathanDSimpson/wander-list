import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import Trips from './Components/Trip/Trips'
import Lists from './Components/List/Lists'
import Items from './Components/Item/Items'
import Edit from './Components/Item/Edit'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>

        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />

        <Route path='/items' component={Items} />
        <Route path='/edit/:id' component={Edit} />

        <Route path='/lists' component={Lists} />

        <Route path='/trips' component={Trips} />
    </Switch>
)
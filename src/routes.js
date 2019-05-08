import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import Trips from './Components/Trip/Trips'
import Lists from './Components/List/Lists'
import Items from './Components/Item/Items'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/trips' component={Trips} />
        <Route path='/lists' component={Lists} />
        <Route path='/items' component={Items} />
    </Switch>
)
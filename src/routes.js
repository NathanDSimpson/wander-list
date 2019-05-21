import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Home from './Components/Home/Home'
import Items from './Components/Item/Items'
import Item from './Components/Item/Item'
import List from './Components/List/List'
import Lists from './Components/List/Lists'
import Trips from './Components/Trip/Trips'
import Trip from './Components/Trip/Trip'

export default (
    <Switch>
        <Route exact path='/' component={Home}/>

        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />

        <Route path='/items' component={Items} />
        <Route path='/item/:id' component={Item} />

        <Route path='/lists' component={Lists} />
        <Route path='/list/:id' component={List} />


        <Route path='/trips' component={Trips} />
        <Route path='/trip/:id' component={Trip} />

    </Switch>
)
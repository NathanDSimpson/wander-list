import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'

import Header from './Components/Header/Header'
import Lists from './Components/List/Lists'
import Items from './Components/Item/Items'
import Trips from './Components/Trip/Trips'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <Trips/>
        <Lists/>
        <Items/>
        <Login/>
        <Register/>
      </div>
    </Provider>
  );
}

export default App;

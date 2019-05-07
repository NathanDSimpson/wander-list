import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import Lists from './Components/List/Lists'
import Items from './Components/Item/Items'
import Trips from './Components/Trip/Trips'

function App() {
  return (
    <div className="App">
      <Header/>
      <Trips/>
      <Lists/>
      <Items/>

    </div>
  );
}

export default App;

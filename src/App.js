import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import Header from './Components/Header/Header'
import router from './routes'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Header/>
          <div className='app-body'>
            {router}  
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;

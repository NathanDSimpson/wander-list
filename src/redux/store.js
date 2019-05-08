import { createStore } from 'redux'
// import { applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import reducer from './reducer'

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// export default createStore(reducer, {}, applyMiddleware(logger()))
// const store = createStore(reducer, initialState, applyMiddleware(logger())) 
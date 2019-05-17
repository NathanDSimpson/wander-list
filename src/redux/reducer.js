const initialState = {
	authenticated: false,
	user_id: 0,
	firstname: '',
	lastname: '',
	email: '',
	items: [],
	lists: [],
	trips: []
}

const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

const GET_ITEMS = 'GET_ITEMS'
const GET_USER_DATA = 'GET_USER_DATA'



const ADD_ITEM ='ADD_ITEM'


export function registerUser(obj) {
	return {
		type: REGISTER_USER,
		payload: obj
	}
}

export function loginUser(obj) {
	return {
		type: LOGIN_USER,
		payload: obj
	}
}

export function logoutUser(obj) {
	return {
		type: LOGOUT_USER,
		payload: obj
	}
}

export function getItems(items){
	return {
		type: GET_ITEMS,
		payload: items
	}
}

export function getUserData(obj){
	return{
		type: GET_USER_DATA,
		payload: obj
	}
}

export function addItem(obj){
	return {
		type: ADD_ITEM,
		payload: obj
	}
}



export default function reducer(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case REGISTER_USER:
			return { 
				...state, 
				firstname: payload.firstname,
				lastname: payload.lastname,
				email: payload.email,
				user_id: payload.user_id,
				authenticated: payload.authenticated
			}
		case LOGIN_USER:
			return { 
				...state, 
				firstname: payload.firstname,
				lastname: payload.lastname,
				email: payload.email,
				user_id: payload.user_id,
				authenticated: payload.authenticated
		}
		case LOGOUT_USER:
			return { 
				authenticated: false,
				user_id: 0,
				firstname: '',
				lastname: '',
				email: '',
				items: [],
				lists: [],
				trips: []
		}
		case GET_ITEMS:
			return {
				...state,
				items: payload
			}
		case GET_USER_DATA:
			return {
				...state,
				items: payload.items,
				lists: payload.lists,
				trips: payload.trips,
			}
		case ADD_ITEM:
			const updatedItems = [...state.items]
			updatedItems.push(payload)
			return {
				...state,
				items: updatedItems
			}
		default:
			return state
	}
}

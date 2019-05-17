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
const GET_LISTS = 'GET_LISTS'
const GET_TRIPS = 'GET_TRIPS'


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

export function getLists(lists){
	return {
		type: GET_LISTS,
		payload: lists
	}
}
export function getTrips(trips){
	return {
		type: GET_TRIPS,
		payload: trips
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
		case GET_LISTS:
			return {
				...state,
				lists: payload
			}
		case GET_TRIPS:
			return {
				...state,
				trips: payload
			}
		case ADD_ITEM:
			const updatedItems = [...state.items]
			updatedItems.push(payload)
			return {
				...state,
				items: updatedItems
			}
		// case DELETE_ITEM:
		// 	return {
		// 		...state,
		// 		items: payload
		// 	}
		default:
			return state
	}
}

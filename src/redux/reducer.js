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
// const UPDATE_USER_ITEMS = 'UPDATE_USER_ITEMS'
// const UPDATE_USER_LISTS = 'UPDATE_USER_LISTS'
// const UPDATE_USER_TRIPS = 'UPDATE_USER_TRIPS'

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

export default function reducer(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case REGISTER_USER:
			return { 
				...state, 
				firstname: payload.firstname,
				lastname: payload.lastname,
				email: payload.email,
				user_id: payload.id,
				authenticated: payload.authenticated
			}
		case LOGIN_USER:
			return { 
				...state, 
				firstname: payload.firstname,
				lastname: payload.lastname,
				email: payload.email,
				user_id: payload.id,
				authenticated: payload.authenticated
		}
		default:
			return state
	}
}

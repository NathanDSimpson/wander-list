const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => { //async to prevent execution from continuing before the database response
        const database = req.app.get('db') //
        const {firstname, lastname, email, password} = req.body
        const { session } = req
        try{
            let alreadyRegistered = await database.checkForEmail({email}) // dont forget you can console log these responses to see the structure
            alreadyRegistered = +alreadyRegistered[0].count
            if (alreadyRegistered !== 0) {
                return res.sendStatus(409)
                console.log( `Already Registered`)
            }
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: register - database.checkForEmail`)
        }
        try {        
            const salt = bcrypt.genSaltSync(10)
            const hashed_password = bcrypt.hashSync(password, salt)
            await database.register({
                firstname,
                lastname,
                email,
                hashed_password
            })
        } catch(err) {
            res.sendStatus(401)
            console.log( `Controller: register - database.register`)
          }

        try{
            const user = await database.login({email}) // get our new user info
            session.user = user[0] // store that info on the session so they don't have to log in afterword
            res.status(200).send({user: user[0]})
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: register - database.login`)
        }
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const { session } = req
        const { email, password } = req.body
        try {
            const credentials = await db.login({email})
            const authorized = bcrypt.compareSync(password, credentials[0].hashed_password)
            if (authorized){
                session.user = credentials[0]
                res.status(200).send({user: session.user})
            } else {
                console.log( `Controller: login - throw new Error`)
                throw new Error(401)
            }
        } catch(err){
            res.sendStatus(401)
            console.log(`Controller: login`)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
      },

    continueSession: (req, res) => {
        const { session } = req
        res.status(200).send(session.user)
    },

    getUserItems: async (req, res) => {
        try {
            const database = req.app.get('db')
            const { user_id } = req.body
            const items = await database.getItems({user_id})
            res.status(200).send(items)
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: getUserItems`)
        }
    },
    
    getUserData: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.body
            const items = await db.getItems({user_id})
            const lists = await db.getLists({user_id})
            const trips = await db.getTrips({user_id})

            // loop through lists to get the items for each
            const lists_with_items = []
            for (const list of lists){
                const listItems = await db.getListItems({list_id: list.list_id}) 
                lists_with_items.push({
                    ...list,
                    list_items: listItems
                })
            }

            // loop through trips to get the lists for each
            const trips_with_lists = []
            for (const trip of trips){
                const tripLists = await db.getTripLists({trip_id: trip.trip_id}) 

                trips_with_lists.push({
                    ...trip,
                    trip_lists: tripLists
                })
            }

            // send back all of the users data
            const userData = {items, lists_with_items, trips_with_lists}
            res.status(200).send(userData)
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: getUserItems`)
        }
	},

    addItem: async (req, res) => {
        const db = req.app.get('db')
        try {
            await db.addItem(req.body)
            res.sendStatus(200)
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: addItem`)
        }
    },

    editItem: async (req, res) => {
        const db = req.app.get('db')
        try {
            await db.updateItem(req.body)
            res.sendStatus(200)
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: editItem`)

        }
    },

    deleteItem: async (req, res) => {
        const db = req.app.get('db')
        try {
            const {item_id} = req.body
            await db.deleteItem({item_id})           
            res.sendStatus(200)
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: deleteItem`)
        }
    },

    getUserLists: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.body
            const lists = await db.getUserLists({user_id})
            res.status(200).send(lists)
        } catch(err){
            res.sendStatus(401)
            console.log( `Controller: getUserLists`)
        }
    },

    getListItems: async (req, res) => {
        const db = req.app.get('db')
        const { list_id } = req.body
        try {
            const listItems = await db.getListItems({list_id})
            res.status(200).send(listItems)
        } catch(err){
            res.sendStatus(401)
            console.log(`Controller: getListItems`)
        }
    },

    editList: async (req, res) => {
        const db = req.app.get('db')
        try{
            await db.updateList(req.body)
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(401)
            console.log(`Controller: editList`)

        }
    },

    deleteList: async (req, res) => {
        const db = req.app.get('db')
        try{
            await db.deleteList(req.body)
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(401)
            console.log(`Controller: deleteList`)

        }
    },

    addList: async (req, res) => {
        const db = req.app.get('db')
        try{
            await db.addList(req.body)
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(401)
            console.log(`Controller: addList`)

        }
    },

    addListItem: async (req, res) => {
        const db = req.app.get('db')
        try{
            await db.addListItem(req.body)
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(401)
            console.log(`Controller: addListItem`)

        }
    },

    removeListItem: async (req, res) => {
        const db = req.app.get('db')
        try{
           await db.deleteListItem(req.body)
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(401)
            console.log(`Controller: removeListItem`)

        }
    },

    addTrip: async (req, res) => {
        const db = req.app.get('db')
        try{
           await db.addTrip(req.body)
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(401)
            console.log(`Controller: addTrip`)

        }
    },

    deleteTrip: async (req, res) => {
        const db = req.app.get('db')
        try{
           await db.deleteTrip(req.body)
            res.sendStatus(200)
        } catch(err) {
            res.sendStatus(401)
            console.log(`Controller: addTrip`)

        }
    }

    


}
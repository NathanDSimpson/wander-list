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
                alert( `Already Registered`)
            }
        } catch(err){
            res.sendStatus(401)
            alert( `Controller: register - database.checkForEmail`)
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
            alert( `Controller: register - database.register`)
          }

        try{
            const user = await database.login({email}) // get our new user info
            session.user = user[0] // store that info on the session so they don't have to log in afterword
            res.status(200).send({user: user[0]})
        } catch(err){
            res.sendStatus(401)
            alert( `Controller: register - database.login`)
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
                alert( `Controller: login - throw new Error`)
                throw new Error(401)
            }
        } catch(err){
            res.sendStatus(401)
            alert( `Controller: login`)
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
            alert( `Controller: getUserItems`)
        }

	},

    addItem: async (req, res) => {
        const db = req.app.get('db')
        try {
            const updatedItemList = await db.addItem(req.body)
            return res.status(200).send(updatedItemList)
        } catch(err){
            res.sendStatus(401)
            alert( `Controller: addItem`)
        }
    },

    editItem: async (req, res) => {
        const db = req.app.get('db')
        try {
            const items = await db.updateItem(req.body)
            res.status(200).send(items)
        } catch(err){
            res.sendStatus(401)
            alert( `Controller: editItem`)

        }
    },

    deleteItem: async (req, res) => {
        const db = req.app.get('db')
        try {
            const {user_id, item_id} = req.body
            await db.deleteItem({item_id})           
            const items = await db.getItems({user_id: user_id})
            res.status(200).send(items)

        } catch(err){
            res.sendStatus(401)
            alert( `Controller: deleteItem`)
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
            alert( `Controller: getUserLists`)
        }
    }
}
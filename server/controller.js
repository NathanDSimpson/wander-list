const bcrypt = require('bcryptjs')

module.exports = {
	getUserItems: async (req, res) => {
        const database = req.app.get('db')
        const { user_id } = req.body
        const items = await database.getItems({user_id})
        res.status(200).send(items)
	},

    register: async (req, res) => { //async to prevent execution from continuing before the database response
        const database = req.app.get('db') //
        const {firstname, lastname, email, password} = req.body
        const { session } = req
        let alreadyRegistered = await database.checkForEmail({email}) // dont forget you can console log these responses to see the structure
        alreadyRegistered = +alreadyRegistered[0].count
        if (alreadyRegistered !== 0) {
            return res.sendStatus(409)
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
          }

        const user = await database.login({email}) // get our new user info
        session.user = user[0] // store that info on the session so they don't have to log in afterword
        res.status(200).send({user: user[0]})
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
                res.status(200).send({user: credentials[0]})
            } else {
                throw new Error(401)
            }
        } catch(err){
            res.sendStatus(401)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
      },


    addItem: async (req, res) => {
        const db = req.app.get('db')
        try {
            console.log(req.body)
            await db.addItem(req.body)
        } catch(err){

        }
    }
}
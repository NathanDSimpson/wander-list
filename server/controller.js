const bcrypt = require('bcryptjs')

module.exports = {
	getUsers: async (req, res) => {
		const database = req.app.get('db')
        const users = await database.getAllUsers()
        res.status(200).send(users)
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
        const salt = bcrypt.genSaltSync(10)
        const hashed_password = bcrypt.hashSync(password, salt)
        await (database.registerUser({
            firstname,
            lastname,
            email,
            hashed_password
        }))
        session.user = {
            firstname,
            lastname,
            email,
        }
        res.sendStatus(200)
    }
}
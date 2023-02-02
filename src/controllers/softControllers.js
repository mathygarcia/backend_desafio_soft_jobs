const jwt = require("jsonwebtoken");
const { getUser, registerUser, verifyUser } = require('../services/softServices')

const Controller = {
    handleError: function (res, error) {
        res.status(error.code || 500).send(error)
    },

    Profile: async (req, res) => {
        try {
            const Authorization = req.header('Authorization')
            const token = Authorization.split('Bearer ')[1]
            jwt.verify(token, 'az_AZ')
            const { email } = jwt.decode(token)
            const usuarios = await getUser(email)
            res.send(usuarios[0])
        } catch (error) {
            Controller.handleError(res, error)
        }
    },

    register: async (req, res) => {
        try {
            const usuario = req.body
            await registerUser(usuario)
            res.send("Usuario creado con éxito")
        } catch (error) {
            Controller.handleError(res, error)
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            const token = jwt.sign({ email }, "az_AZ", { expiresIn: '1h' })
            await verifyUser(email, password)
            res.send(token)
        } catch (error) {
            console.log(error)
            Controller.handleError(res, error.message)
        }
    }
}

module.exports = Controller;
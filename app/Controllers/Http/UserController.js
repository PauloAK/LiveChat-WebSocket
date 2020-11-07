'use strict'

const User = use('App/Models/User')

class UserController {
    async index ({ response }) {
        return response.json({ data: await User.all() })
    }
}

module.exports = UserController

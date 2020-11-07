'use strict'

const User = use('App/Models/User')

class AuthController {

    async login ({request, auth, response}) {
        let params = request.only(['username', 'password']);
        let token = await auth.withRefreshToken().attempt(params.username, params.password);

        return response.json({ message: "Logged in!", token: token.token});
    }

    async register ({ request, auth, response }) {
        let params = request.only(['username', 'name', 'password']);
        let user = await User.create(params);
        let token = await auth.withRefreshToken().generate(user);

        return response.status(201).json({ message: "Created successfully!", token: token.token});
    }

}

module.exports = AuthController

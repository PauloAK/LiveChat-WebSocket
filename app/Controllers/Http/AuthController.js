'use strict'

const User = use('App/Models/User')

class AuthController {

    async login ({request, auth, response}) {
        let params = request.only(['username', 'password']);
        let token = await auth.withRefreshToken().attempt(params.username, params.password);
        let user = await User.query().where('username', params.username).first();
        return response.json({ message: "Logged in!", token: token.token, user: user });
    }

    async register ({ request, auth, response }) {
        let params = request.only(['username', 'name', 'password']);
        let user = await User.create(params);
        let token = await auth.withRefreshToken().generate(user);

        return response.status(201).json({ message: "Created successfully!", token: token.token, user: user});
    }

    async me ({ auth, response }){
        return response.json( await auth.user );
    }

}

module.exports = AuthController

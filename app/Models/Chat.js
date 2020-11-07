'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {

    static scopeHasProfile (query) {
        return query.has('profile')
    }

    chatUser () {
        return this.hasMany('App/Models/ChatUser');
    }

    users () {
        return this.manyThrough('App/Models/ChatUser', 'user');
    }

    messages () {
        return this.hasMany('App/Models/Message')
    }

}

module.exports = Chat

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {

    participants () {
        return this.hasMany('App/Models/ChatUser');
    }

    owner () {
        return this.belongsTo('App/Models/User')
    }

    users () {
        return this.manyThrough('App/Models/ChatUser', 'user');
    }

    messages () {
        return this.hasMany('App/Models/Message')
    }

}

module.exports = Chat

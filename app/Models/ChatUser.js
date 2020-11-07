'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatUser extends Model {

    user () {
        return this.hasOne('App/Models/User')
    }

    chat () {
        return this.belongsTo('App/Models/Chat')
    }

}

module.exports = ChatUser

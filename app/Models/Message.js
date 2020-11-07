'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
    static get table () {
        return 'chat_messages';
    }

    chat () {
        return this.belongsTo('App/Models/Chat')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Message

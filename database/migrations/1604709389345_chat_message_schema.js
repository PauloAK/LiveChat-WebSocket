'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatMessageSchema extends Schema {
  up () {
    this.create('chat_messages', (table) => {
      table.bigIncrements()
      table.integer('chat_id').unsigned().references('id').inTable('chats').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.text('content').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('chat_messages')
  }
}

module.exports = ChatMessageSchema

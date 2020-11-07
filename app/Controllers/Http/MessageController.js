'use strict'

const Chat = use ('App/Models/Chat');
const Message = use ('App/Models/Message');

class MessageController {

    async store ({ request, auth, chat_id, response }) {
        let params = request.only(['content']);

        let chat = await auth.user.chats().where((chat_id) => { this.where('id', chat_id) }).first();
        
        let message = chat.messages().create({
            content: params.content
        });

        return response.json({ data: message });
    }

    async update ({ auth, chat_id, id, response }) {
        let message = auth.user.chats().find(chat_id).messages().find(id).update({
            content: request.content
        });

        return response.json({ data: message })
    }

    async destroy ({ auth, chat_id, id, response }) {
        auth.user.chats().find(chat_id).messages().find(id).destroy();
        return response.json({ message: "Message deleted" })
    }
}

module.exports = MessageController

'use strict'


class MessageController {

    async store ({ request, auth, params, response }) {
        const { content } = request.all();

        let chat = await auth.user.joinedChats().where('chats.id', params.chat_id).firstOrFail();
        
        let message = await chat.messages().create({
            content: content,
            user_id: auth.user.id
        });

        return response.json({ data: message });
    }

    async update ({ request, auth, params, response }) {
        const { content } = request.all();

        let chat = await auth.user.chats().where('chats.id', params.chat_id).firstOrFail();

        let message = await chat.messages().where('chat_messages.id', params.id).update({
            content: content
        });

        return response.json({ data: message })
    }

    async destroy ({ auth, params, response }) {
        let chat = await auth.user.chats().where('chats.id', params.chat_id).firstOrFail();
        await chat.messages().where('chat_messages.id', params.id).delete();
        return response.json({ message: "Message deleted" })
    }
}

module.exports = MessageController

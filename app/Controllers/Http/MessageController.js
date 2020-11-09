'use strict'

const Ws = use("Ws");

class MessageController {

    async store ({ request, auth, params, response }) {
        const { content } = request.all();

        let chat = await auth.user.joinedChats().where('chats.id', params.chat_id).firstOrFail();
        
        let message = await chat.messages().create({
            content: content,
            user_id: auth.user.id
        });

        this.sendWSData(chat.id, message);
        return response.json({ data: message });
    }

    async update ({ request, auth, params, response }) {
        const { content } = request.all();

        let chat = await auth.user.chats().where('chats.id', params.chat_id).firstOrFail();

        let message = await chat.messages().where('chat_messages.id', params.id).update({
            content: content
        });

        this.sendWSData(chat.id, message);
        return response.json({ data: message })
    }

    async destroy ({ auth, params, response }) {
        let chat = await auth.user.chats().where('chats.id', params.chat_id).firstOrFail();
        await chat.messages().where('chat_messages.id', params.id).delete();
        return response.json({ message: "Message deleted" })
    }

    sendWSData(chat_id, message) {
        let channel = Ws.getChannel('chat:*');
        const topic = channel.topic(`chat:${chat_id}`);

        if(topic){
            topic.broadcast('message', message);
        }
    }
}

module.exports = MessageController

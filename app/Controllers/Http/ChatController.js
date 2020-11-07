'use strict'

const Chat = use('App/Models/Chat')

class ChatController {

    async index ({ auth, response }) {
        return response.json({ data:  await auth.user.chats().fetch() });
    }

    async store ({ request, auth, response }) {
        let params = request.only(['name']);
        let chat = await Chat.create({ name: params.name });
        chat.chatUser().create({ user_id: auth.user.id });

        return response.json({ message: 'Chat created!', id: chat.id })
    }

    async show ({ auth, response, id }) {
        let chat = await auth.user.chats().find(id).with('messages');

        return response.json({ data: chat });
    }

    async destroy ({ auth, response, id}) {
        let chat = await auth.user.chats().find(id);

        chat.messages().destroy();
        chat.destroy();

        return response.json({ message: "Chat deleted!"});
    }

}

module.exports = ChatController

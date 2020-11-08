'use strict'

class ChatController {

    async index ({ auth, response }) {
        return response.json(await auth.user.joinedChats().fetch());
    }

    async store ({ request, auth, response }) {
        const { name } = request.all();

        let chat = await auth.user.chats().create({ name: name, user_id: auth.user.id });
        await chat.participants().create({ user_id: auth.user.id });

        return response.json({ message: 'Chat created!', id: chat.id });
    }

    async show ({ auth, response, params }) {
        let chat = await auth.user.joinedChats().where('chats.id', params.id).with('messages').firstOrFail();

        return response.json(chat);
    }

    async destroy ({ auth, response, params}) {
        let chat = await auth.user.chats().where('chats.id', params.id).firstOrFail()

        chat.messages().delete();
        chat.delete();

        return response.json({ message: "Chat deleted!"});
    }

    async participant({ auth, response, request, params }) {
        const { user_id } = request.all();

        let chat = await auth.user.chats().where('chats.id', params.id).firstOrFail();
        await chat.participants().create({ user_id: user_id });

        return response.json({ message: 'User added to chat!' })
    }

    async participants({ auth, response, params }){
        let chat = await auth.user.chats().where('chats.id', params.id).firstOrFail();

        return response.json( chat.participants() )
    }

}

module.exports = ChatController

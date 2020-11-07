'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Auth Routes
Route.post('/auth/login', 'AuthController.login').validator('Auth/Login');
Route.post('/auth/register', 'AuthController.register').validator('Auth/Register');

Route.group(() => {
  // Chats
  Route.get('/chats', 'ChatController.index');
  Route.get('/chats/:id', 'ChatController.show');
  Route.post('/chats', 'ChatController.store').validator('Chat/Store');
  Route.get('/chats/:id/participants', 'ChatController.participants');
  Route.post('/chats/:id/participants', 'ChatController.participant').validator('Chat/Participant');
  Route.delete('/chats/:id', 'ChatController.destroy');

  // Messages
  Route.post('/chats/:chat_id/messages', 'MessageController.store').validator('Message/Store');
  Route.put('/chats/:chat_id/messages/:id', 'MessageController.update').validator('Message/Update');
  Route.delete('/chats/:chat_id/messages/:id', 'MessageController.destroy');

}).middleware('auth');
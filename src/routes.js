import { Router } from 'express';
import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.get('/posts', PostController.index);
routes.get('/posts/:author', PostController.show);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users/:username', UserController.update);
routes.delete('/users/:username', UserController.destroy);

routes.post('/posts/:author', PostController.store);
routes.put('/posts/:_id', PostController.update);
routes.delete('/posts/:_id', PostController.destroy);

export default routes;

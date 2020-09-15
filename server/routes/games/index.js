import express from 'express';
import { gamesController as controller } from '../../controllers';
import userIsAuth from '../../middlewares/userIsAuth';

const Router = express.Router();
Router.post('/create', userIsAuth, controller.createGame);
Router.put('/update/:id', userIsAuth, controller.updateGame);
Router.delete('/delete/:id', userIsAuth, controller.deleteGame);
Router.get('/find/:id', controller.getGameById);
Router.get('/find', controller.getGames);

export default Router;

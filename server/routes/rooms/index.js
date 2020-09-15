import express from 'express';
import { roomsController as controller } from '../../controllers';
import userIsAuth from '../../middlewares/userIsAuth';
import minigameHasntOver from '../../middlewares/minigameHasntOver';
import minigameHasOver from '../../middlewares/minigameHasOver';

const Router = express.Router();
Router.post('/create', userIsAuth, controller.crud.createRoom);
Router.put('/update/:id', userIsAuth, controller.crud.updateRoom);
Router.get('/find/:id', userIsAuth, controller.crud.getRoomById);
Router.get('/find', controller.crud.getRooms);

Router.post('/find/:id/:minigameCode/start', userIsAuth, controller.minigames.startMinigame);
Router.get(
    '/find/:id/:minigameCode/data-and-stats',
    userIsAuth,
    minigameHasOver,
    controller.minigames.getMinigameDataAndPlayerStats
);

Router.get(
    '/find/:id/:minigameCode/hint',
    userIsAuth,
    minigameHasntOver,
    controller.guessing.getProperHint
);

Router.post(
    '/find/:id/:minigameCode/answer',
    userIsAuth,
    minigameHasntOver,
    controller.guessing.postAnswer
);

Router.get(
    '/find/:id/:minigameCode/word',
    userIsAuth,
    minigameHasntOver,
    controller.hangman.getProperWord
);

Router.post(
    '/find/:id/:minigameCode/answer',
    userIsAuth,
    minigameHasntOver,
    controller.hangman.postAnswer
);

export default Router;

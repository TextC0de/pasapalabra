import express from 'express';
import { usersController as controller } from '../../controllers';
import userIsAuth from '../../middlewares/userIsAuth';

const Router = express.Router();
Router.get('/checkauth', userIsAuth, controller.isAuthenticated);
Router.post('/register', controller.registerUser);
Router.post('/login', controller.loginUser);
Router.post('/logout', controller.logoutUser);

Router.put('/update/:id', userIsAuth, controller.updateUser);
Router.delete('/delete/:id', userIsAuth, controller.deleteUser);

Router.get('/find/:username', controller.getUserByUsername);
Router.get('/find', controller.getUsers);

export default Router;

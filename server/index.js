import path from 'path';
import express from 'express';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import next from 'next';
import connectDB from './database';
import { gamesRoutes, usersRoutes, roomsRoutes } from './routes';
import { User } from './models/index';

require('dotenv').config({
    path: path.join(
        __dirname,
        `../.env.${process.env.NODE_ENV === 'production' ? 'production' : 'development'}`
    )
});

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const MongoStore = connectMongo(expressSession);

connectDB();

nextApp
    .prepare()
    .then(() => {
        const server = express();
        server.use(morgan('dev'));
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        server.use(
            expressSession({
                secret: process.env.SECRET,
                resave: false,
                saveUninitialized: false,
                store: new MongoStore({ mongooseConnection: mongoose.connection })
            })
        );

        server.use(passport.initialize());
        server.use(passport.session());
        passport.use(User.createStrategy());
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());

        server.use((req, res, nextAction) => {
            res.locals.currentUser = req.user;
            nextAction();
        });

        server.use('/api/games', gamesRoutes);
        server.use('/api/users', usersRoutes);
        server.use('/api/rooms', roomsRoutes);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(PORT, (err) => {
            if (err) throw err;
            console.log(`> Ready on ${process.env.NEXT_PUBLIC_HOST}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });

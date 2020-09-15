import passport from 'passport';
import { User } from '../../models';

const MIN_PASSWORD_LENGTH = 8;

const isAuthenticated = async (req, res) => {
    return res.status(200).json({
        message: 'User is authenticated'
    });
};

const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password || password.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({
            error: 'You must provide an email, a username, and a password with length > 7'
        });
    }

    User.register({ email, username }, password, (error, user) => {
        if (error) {
            return res.status(400).json({
                error,
                message: `Error while registering user with email: ${email} and username "${username}"`
            });
        }

        req.login(user, (loginError) => {
            if (loginError) {
                return res.status(401).json({
                    error,
                    message: `Error while logging in after successfull registration user with email: ${email} and username "${username}"`
                });
            }

            return res.status(200).json({
                message: 'Register and logging where successfull'
            });
        });
    });
};

const loginUser = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a username and a password'
        });
    }

    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json({
                error: 'Username or password are invalid'
            });
        }

        req.logIn(user, (errorLogin) => {
            if (errorLogin) {
                return next(errorLogin);
            }

            return res.status(200).json({
                message: 'Logged in successfully'
            });
        });
    })(req, res, next);
};

const logoutUser = (req, res) => {
    try {
        req.logout();
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: 'Unable to logout'
        });
    }
};

const updateUser = async ({ body, params }, res) => {
    const { id } = params;
    if (!body || !id) {
        return res.status(400).json({
            error: 'You must provide a body and the user id to update'
        });
    }

    try {
        await User.findByIdAndUpdate(params.id, body);
        return res.status(200).json({
            success: true,
            message: 'User updated!'
        });
    } catch (error) {
        return res.status(404).json({
            error,
            message: `User with ${id} not updated!`
        });
    }
};

const deleteUser = async ({ params }, res) => {
    const { id } = params;
    if (!id) {
        return res.status(400).json({
            error: 'You must provide a user id for delete'
        });
    }

    try {
        await User.findOneAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: `The user with id "${id}" was deleted`
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: `The user with id "${id}" wasn't deleted`
        });
    }
};

const getUserByUsername = async ({ params }, res) => {
    const { username } = params;
    if (!username) {
        return res.status(400).json({
            error: 'You must provide an username'
        });
    }

    try {
        const user = await User.findOne({ username });

        return res.status(200).json({
            success: true,
            message: `The user with username "${username}" was found and delivered`,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: `The user with username "${username}" wasn't found`
        });
    }
};

const getUsers = async ({ query }, res) => {
    const { filters = {}, projection = null, options = {} } = query;
    if (
        typeof filters !== 'object' ||
        typeof projection !== 'string' ||
        typeof options !== 'object'
    ) {
        return res.status(400).json({
            error:
                "Couldn't get users, the filter must be an object, the projection must be an string, and the options must be an object"
        });
    }

    try {
        const users = User.find({}, null, { limit: 10 });
        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: `Couldn't get users with
            filters: ${JSON.stringify(filters)}, 
            projection: ${projection},
            options: ${JSON.stringify(options)}`
        });
    }
};

export default {
    isAuthenticated,
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByUsername
};

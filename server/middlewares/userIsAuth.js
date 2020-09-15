export default ({ user }, res, next) => {
    if (user) {
        return next();
    }

    return res.status(401).json({
        error: 'User not authenticated'
    });
};

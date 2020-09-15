import bcrypt from 'bcrypt';

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(16);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
};

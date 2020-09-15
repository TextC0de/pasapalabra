import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            select: false
        },
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: true,
            trim: true
        }
    },
    { timestamps: true }
);

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);

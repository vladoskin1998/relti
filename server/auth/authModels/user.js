import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const User = new Schema(
    {
        login: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        token: { type: Schema.Types.ObjectId, ref: 'Token' },
        roles: { type: String, required: true, default: "USER" }
    }, {
        versionKey: false 
    }
)



export default model('User', User)
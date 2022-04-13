import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Token = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String },
}, {
    versionKey: false
})

export default model('Token', Token)
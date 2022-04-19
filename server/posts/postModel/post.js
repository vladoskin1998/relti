import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const Post = new Schema(
    {
        city: { type: String, required: true },
        street: { type: String, required: true },
        address: { type: String, required: true },
        price: { type: Number, required: true },
        rentOrBuy: {type: String, enum:["BUY", "RENT"], required: true, default: "RENT"},
        describe: String,
        images: [String],
        date: { type: Date, default: new Date() }
    }, {
        versionKey: false 
    }
)

Post.plugin(mongoosePaginate);

export default model('Post', Post)
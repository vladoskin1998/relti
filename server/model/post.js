import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const Post = new Schema(
    {
        city: { type: String, required: true },
        street: { type: String, required: true },
        address: { type: String, required: true },
        areas: {type: String},
        numberOfStoreys: {type: Number || String},
        storey: {type: Number || String},
        square: {type: Number || String, required: true },
        price: { type: Number, required: true },
        currency: {type: String, enum:["UAH", "EUR", "USD"], default: "UAH" },
        rentOrBuy: {type: String, enum:["BUY", "RENT"], required: true, default: "RENT"},
        describe: String,
        images: {type:[String], default:[]},
        date: { type: Date, default: new Date() }

    }, {
        versionKey: false 
    }
)

Post.plugin(mongoosePaginate);

export default model('Post', Post)


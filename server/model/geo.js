import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Geo = new Schema(
    {
        geoToken: { type: String, required: true, unique: true },
    }, {
        versionKey: false 
    }
)



export default model('Geo', Geo)
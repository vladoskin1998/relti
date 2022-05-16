import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Areas = new Schema(
    {
        areaName: { type: String, required: true, unique: true },
        idCity: { type: String, ref: 'Cities' },
    }, {
        versionKey: false 
    }
)



export default model('Areas', Areas)
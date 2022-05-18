import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Areas = new Schema(
    {
        areaName: { type: String, required: true },
        idCity: { type: Schema.Types.String, ref: 'Cities', unique: true },
    }, {
        versionKey: false 
    }
)



export default model('Areas', Areas)
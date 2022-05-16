import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Cities = new Schema(
    {
        cityName: { type: String, required: true, unique: true },
    }, {
        versionKey: false 
    }
)

export default model('Cities', Cities)
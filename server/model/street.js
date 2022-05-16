import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Streets = new Schema(
    {
        streetName: { type: String, required: true, unique: true },
        idCity: { type: Schema.Types.ObjectId, ref: 'Cities' },
    }, {
        versionKey: false 
    }
)



export default model('Streets', Streets)
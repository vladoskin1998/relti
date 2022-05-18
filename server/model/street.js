import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Streets = new Schema(
    {
        streetName: { type: String, required: true},
        idCity: { type: Schema.Types.String, ref: 'Cities', unique: true  },
    }, {
        versionKey: false 
    }
)



export default model('Streets', Streets)
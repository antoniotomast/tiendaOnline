const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'regular'
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
}, { timestamps: true, versionKey: false });

module.exports = model('user', userSchema);
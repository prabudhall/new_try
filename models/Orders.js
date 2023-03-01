const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_id:{
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('orders', orderSchema);
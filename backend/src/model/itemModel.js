const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    id: Number,
    TranslatedRecipeName: String,
    menuId: Number
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
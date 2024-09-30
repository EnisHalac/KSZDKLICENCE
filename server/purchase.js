const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: Schema.Types.ObjectId, ref: 'FanShopItem', required: true },
  quantity: { type: Number, default: 1 },
  productCategory: { type: String, default: 'Majica' }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;

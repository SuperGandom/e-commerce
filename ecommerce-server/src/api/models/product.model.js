const mongoose = require('mongoose');
/**
 * File Schema
 * @private
 */
const productSchema = new mongoose.Schema({
  media:{
    type:Object
  },
  title: { type: String, required: 'title can\'t be empty'},
  description: { type: String},
  detail: {
      type: String,
  },
  category: { type: String,required: 'Category can\'t be empty' },
  regularPrice: {
      type: Number,
      default:0
  },
  salePrice: {
      type: Number,
      default:0
  },
  taxRate: {
      type: Number,
      default:0
  },
  barcode: {
      type: Number,
  },
  brand: {
      type: String,
  },
  supplier: {
      type: String,
  },
  currency:{
      type: String,
      enum:["USD","Euro"],
      default:"USD"
  },
  created_at:{
    type: Date,
    default: new Date()
  },
  currentStock: { type: Number, default:0},
  minStock: { type: Number, default:0},
  maxStock: { type: Number, default:100},
  status:{
      type: String,
      enum:["out of stock","in stock"],
      default:"in stock"
  },
});

module.exports = mongoose.model('Product', productSchema);

const httpStatus = require('http-status');
//const {PayU, Currency}  = require('@ingameltd/payu');
const APIError = require('../utils/APIError');
const { smsConfig, paymentConfig, culqiConfing } = require('../../config/vars');
const Product = require('../models/product.model');
const Media = require('../models/media.model');
const Category = require('../models/category.model');
const Brand = require('../models/brand.model');
const Order = require('../models/order.model');
const path = require('path');
const mongoose = require('mongoose');
const { func } = require('joi');

exports.getCategories = async (req, res) => {

  if (req.params.key === 'all') {
    const categories = await Category.find().sort({ name: 1 });

    res.status(httpStatus.OK).json(categories)
  }
};

exports.getBrands = async (req, res) => {
  if (req.params.key === 'all') {
    const brands = await Brand.find().sort({ name: 1 });

    res.status(httpStatus.OK).json(brands)
  }
};

exports.getProductsByCategory = async (req, res) => {
  const arr = req.body.sendData;

  let sendArr = [];
  await Promise.all(arr.map(async (p) => {
    const product = await Product.findOne({ category: p });
    const media = await Media.findOne({ productID: product._id });
    product.media = media;
    sendArr.push(product)
  }));

  res.status(httpStatus.OK).json(sendArr)
}

exports.getProductsByBrand = async (req, res) => {

  const arr = req.body.sendData;

  let sendArr = [];
  await Promise.all(arr.map(async (p) => {
    const product = await Product.findOne({ brand: p });
    const media = await Media.findOne({ productID: product._id });
    product.media = media;
    sendArr.push(product)
  }));

  res.status(httpStatus.OK).json(sendArr)

};

exports.getOneProduct = async (req, res) => {
  const productId=req.params.productId;
  const product = await Product.findById(productId);
  const media = await Media.findOne({ productID: productId });
  product.media=media;

res.status(httpStatus.OK).json(product)

}

exports.addToCart=async(req,res)=>{
  const username=req.body.username;
  const productTitle=req.body.productTitle;
  const price=req.body.price;
  const newFile = await new Order({name:Date.now(), product:productTitle,customer:username,total:price,order_at:new Date().toISOString() }).save();
  res.status(httpStatus.OK).json('ok')
}

exports.getAllProducts = async (req, res) => {

  const products = await Product.find().sort({ createdAt: -1 });


  await Promise.all(products.map(async (p) => {
    const media = await Media.findOne({ productID: p._id });
    p.media = media;
  }));

  res.status(httpStatus.OK).json(products)
};

exports.getCartByUser = async (req, res) => {
  const username=req.params.username;
  const order= await Order.find({customer:username});
  await Promise.all(order.map(async (o) => {
    const product = await Product.findOne({title:o.product});
    const media = await Media.findOne({ productID: product._id });
    product.media = media;
    o.productData=product;
  }));

  res.status(httpStatus.OK).json(order)

};

exports.deleteCart = async (req, res) => {
  const orderId=req.params.orderId;
  const order= await Order.findByIdAndDelete(orderId);
  res.status(httpStatus.OK).json(order)
};


exports.changeCount = async (req, res) => {
  const key=req.params.key;
  const orderId=req.params.orderId;
  const oneOrder=await Order.findById(orderId);
  const price=oneOrder.total/oneOrder.quantity;

  if(key==='plus'){
    const order= await Order.findByIdAndUpdate(orderId, {$inc : {'quantity' : 1,'total':price}},  {new: true}, );
    res.status(httpStatus.OK).json(order)
  }else if(key==='minus'){
    const order=await Order.findById(orderId);
    if(order.quantity===1){
      res.status(httpStatus.OK).json('default')
    }else{
      const order= await Order.findByIdAndUpdate(orderId,
         {$inc : {'quantity' : -1,'total':-price}}, {new: true}, );
      res.status(httpStatus.OK).json(order)
    }
  }

};

exports.getRelativeProducts = async (req, res) => {
  console.log('req.params')
  console.log(req.params)
  const productId=req.params.productId;
  const category=req.params.category;

  let slicePos;

  let relativeProducts=await Product.find({category}).sort({created_at:-1}).limit(5);
  relativeProducts.forEach((product,idx)=>{
    if(product._id===productId){
      slicePos=idx;
    }
  })
  if(slicePos){
    relativeProducts.splice(slicePos,1);
  }else{
    relativeProducts.splice(relativeProducts.length-1,1)
  }
  await Promise.all(relativeProducts.map(async (product) => {
    const media = await Media.findOne({ productID: product._id });
    product.media = media;
  }));
  console.log('relativeProducts')
  console.log(relativeProducts)
  res.status(httpStatus.OK).json(relativeProducts)

};








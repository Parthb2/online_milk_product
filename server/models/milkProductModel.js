const mongoose  = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:[],
    prices:[],
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
},{timestamps:true});

const milkProductModel = mongoose.model('products', productSchema);

module.exports = milkProductModel;
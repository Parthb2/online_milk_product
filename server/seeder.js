const mongoose = require('mongoose')
const dotenv = require('dotenv')
require('colors')
const connectDB = require('./config/config')
const ProductsModel = require('./models/milkProductModel')
const Products = require('./data/milk-product')

//config dotevn and mongoDB conn file
dotenv.config()
connectDB()

//import data
const importData = async () => {
    try {
        await ProductsModel.deleteMany()
        const sampleData = Products.map(product => {return {...product}})
        await ProductsModel.insertMany(sampleData)
        console.log(`Data Imported`.bgGreen.black)
        process.exit()
    } catch (error) {
        console.log(`${error}`.bgRed.black);
        process.exit(1)//1 for failuar
    }
}

const dataDestroy = () =>{}

if(process.argv[2] === '-d'){
    dataDestroy()
}else{
    importData()
}


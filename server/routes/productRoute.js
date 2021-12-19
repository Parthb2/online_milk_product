const express =require('express')
const router = express.Router()
const milkProductModel = require('../models/milkProductModel') 


// GET ALL PRODUCTS || @GET request
router.get('/getallproducts', async (req, res) => {
    try {
        const products = await milkProductModel.find({})
        res.send(products)
    } catch (error) {
        res.json({ massage: error })
        
    }
})

router.post('/addProduct', async (req, res) => {
    const {product}  = req.body
    try {
        const newProduct = new milkProductModel({
            name: product.name,
            image: product.image,
            weight: product.weight,
            description: product.description,
            category: product.category,
            prices:[product.prices]
        })
        await newProduct.save()
        res.status(201).send('New product added')
    } catch (error) {
        res.json({ massage: error })
        
    }
})

router.post('/getproductbyid', async (req, res) => {
    
    const productId = req.body.productId
    try {
        const product = await milkProductModel.findOne({_id:productId})
        res.send(product)
    } catch (error) {
        res.json({ massage: error })
        
    }

})

router.post('/updateproduct',async (req, res)=>{
    const updatedProduct = req.body.updatedProduct
    try {
       const product=   await milkProductModel.findOne({_id:updatedProduct._id})
        product.name = updatedProduct.name,
        product.description = updatedProduct.description,
        product.image = updatedProduct.image,
        product.category = updatedProduct.category,
        product.prices=[updatedProduct.prices]
        await product.save()
        res.status(200).send('Product updated successfully')
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
})

router.post('/deleteproduct', async (req,res)=>{
    const productId = req.body.productId
    try {
        await milkProductModel.findOneAndDelete({_id:productId})
        res.status(200).send('Product deleted')
    } catch (error) {
        res.status(404).json({
            message:error
        })
    }
})


module.exports = router;

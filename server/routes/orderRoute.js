const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51JJi4qSDyht7Rp2MbqW9w7nYlYJG5KRrfLyHgzehmdQA6HOJBJkoum4Jy5igvBucuekZXFjrvk3YR2EuvBLR2t1d00pu9txFrn')


const Order = require('../models/orderModel')

router.post('/placeorder', async (req, res) => {
    const { token, subTotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: subTotal * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email

        }, {
            idempotencyKey: uuidv4()
        })

        if (payment) {
            const newOrder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userid: currentUser._id,
                orderItems: cartItems,
                orderAmount: subTotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    zip: token.card.address_zip
                },
                transactionId: payment.source.id,
            })
            newOrder.save()
            res.send('Payment Success')
        } else {
            res.send('Payment Failed')

        }
    } catch (error) {
        res.status(200).json({
            message: 'Something wents wrong',
            error: error.stack,
        })
    }

})

router.post('/getUserOrder', async (req, res) => {
    const { userid } = req.body
    try {
        const orders = await Order.find({ userid }).sort({_id:'-1'})
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).json({
            message: 'Something wents wrong',
            error: error.stack,
        })
    }
})

router.get('/getalluserorders', async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).json({
            message: 'Something wents wrong',
            error: error.stack,
        })
    }
})

router.post('/deliverorder', async (req, res) => {

    const orderId = req.body.orderId
    try {
        const order = await Order.findOne({_id:orderId})
        order.isDelivered = true
        await order.save()
        res.status(200).send('Order Delivered Success')
    } catch (error) {
        res.status(400).json({
            message: 'Something wents wrong',
            error: error.stack,
        })
    }
})

module.exports = router
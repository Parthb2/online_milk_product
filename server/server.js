const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/config')
require('colors')
const morgan = require('morgan')

//config dotenv

dotenv.config()


// monogDB Connection
connectDB()

const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))

//route
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/orders', require('./routes/orderRoute'));


app.get('/', (req, res) => {
    res.send("<h1>Hellos from nodemon</h1>")
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server Running on ${process.env.NODE_ENV} mode on port no ${process.env.PORT}`.bgMagenta.black)
})
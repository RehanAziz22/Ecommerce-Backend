const express = require('express')
const ConnectDB = require('./config/db')
const cors = require('cors')
const app = express()
require('dotenv').config()

ConnectDB()

app.use(express.json())
app.use(cors())
const userRouter = require("./Routes/userRoutes")
const adminRouter = require("./Routes/adminRoutes")
const productRouter = require("./Routes/productRoutes")
const cartRoutes = require("./Routes/productCartRoutes")
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRoutes);



//testing
app.get("/",(req,res)=>{
    res.json({
        message:"Server is running"
    })
})


const PORT = process.env.port || 8000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
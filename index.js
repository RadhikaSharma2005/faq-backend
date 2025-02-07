

const express = require('express')
const app = express();
app.use(express.json())
require('dotenv').config();
const mongoose = require("mongoose")
async function main(){
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Connection is Up");
}
main();


const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['POST','GET','PUT','DELETE'], 
    allowedHeaders: ['Content-Type'], 
    // credentials: true 
}


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));


const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use('/admin',adminRouter);
app.use('/user',userRouter);



app.listen(process.env.PORT||3000 , ()=>{
    console.log(`server is listening on ${process.env.PORT}` );

})


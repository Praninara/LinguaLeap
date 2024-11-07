import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';

const port = 5000;
import connectDB from './config/db.js';
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Api is running")
})

app.use('/api/users',userRouter);

app.listen(port,()=> console.log("server is running in port"))
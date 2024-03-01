import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
// import  postRoutes from './routes/postRoutes.js'
import router from './routes/postRoutes.js'

dotenv.config()
// console.log(process.env.MONGO_URL);
connectDB()

const PORT = 5000

const app = express()

// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use("/api", router );
app.get("/" ,(req,res) => {
    res.send("<h1>Hello World..</h1>");
});




app.listen(PORT, ()=>console.log(`Server started on port${PORT}`))
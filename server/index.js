// this runs on localhost currently

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors());

app.use(express.json({limit: "20mb", extended: true}));
app.use(express.urlencoded({limit: "20mb", extended: true}));

app.use('/user', userRoutes); 
app.use() // for auction routes later

const URL = process.env.DB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(URL, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(() => app.listen(PORT, () => 
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));


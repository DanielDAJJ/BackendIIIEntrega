import app from './app.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, ()=>{
            console.log(`listening on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));
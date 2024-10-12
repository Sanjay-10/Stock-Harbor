import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());


// Connect to MongoDB
const PORT = process.env.PORT || 5001;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () =>console.log(`Server running on port ${PORT}`));
        
    })
.catch((error) => console.log(error.message));

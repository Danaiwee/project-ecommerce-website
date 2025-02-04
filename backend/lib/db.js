import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to mongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log("Error in connect Mongo DB");
        process.exit(1)
    }
};
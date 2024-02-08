import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
 const connectDB = () => {
  mongoose.connect('mongodb+srv://kidan:kidan1234@portfolio.awtszcq.mongodb.net/portfolio?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      // Start your Express server or define your routes here
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
};
export  default connectDB
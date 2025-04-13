import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Note from './models/Note.js'; // Import your Note model
import multer from 'multer';
import converterRoutes from './routes/UnitConverter/converter.js'; // Import your converter routes
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/converter', converterRoutes);


// MongoDB connection and server start
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

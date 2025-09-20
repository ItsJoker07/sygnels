const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express(); 
app.use(cors({ origin: 'https://sygnels.com' })); // Replace with your actual domain
app.use(express.json());
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Atlas connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://shahid:affan@cluster0.eb3n7i5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// Schema and Model
const dataSchema = new mongoose.Schema({
    Teamname: String,
    Member1: String,
    Member2: String,
    Member3:String,
    Phone: String,
    Alternatephone:String,
    email: String,
    college: String,
    Participation:String,
    upi: String,
    verified:String,
});
const Data = mongoose.model('Data', dataSchema);

// API routes
app.post('/api/data', async (req, res) => {
    try {
        const { Teamname,Member1,Member2,Member3, Phone,Alternatephone, email, college,Participation, upi,verified  } = req.body;
        const newData = new Data({ Teamname,Member1,Member2,Member3, Phone,Alternatephone, email, college,Participation, upi,verified });
        await newData.save();
        res.status(201).json({ message: 'Data saved' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving data' });
    }
});

app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));

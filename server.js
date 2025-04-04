require('dotenv').config();
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
const app = require('./src/app');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

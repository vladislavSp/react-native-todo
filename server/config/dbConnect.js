const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATA_BASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;

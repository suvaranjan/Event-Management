const express = require('express');
const cors = require('cors');
const connect = require("../server/config/db");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with the origin of your frontend application
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Event Management API');
});

app.use("/api", authRoutes);
app.use("/api/event", eventRoutes);

connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server connected to http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
});

require('dotenv').config();
const { error } = require('console');
const express = require('express');
const app = express();
const db = require('mongoose');
const teamRouter = require('./routes/teamRoutes');
const playerRouter = require('./routes/playerRoutes');
const cors = require('cors');

db.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(8080);
})
.catch((error) => {
    console.error("Error during connection to MongoDB Atlas: ", error);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use('/team', teamRouter);
app.use('/player', playerRouter);
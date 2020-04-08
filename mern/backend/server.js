const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established succesfully');
});

const exercisesRouter = require('./routes/exercises');
const usersRoutes = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRoutes);
 
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

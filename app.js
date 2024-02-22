const express=require('express');
const app=express();
app.use(express.json());
const teamsRoutes=require('./routes/teamsRoutes');
const userRoutes=require('./routes/userRoutes');
const morgan=require('morgan');

app.use(morgan('dev'));

// ==================================================================== //
// Mounting router
app.use('/api/v1/teams',teamsRoutes);
app.use('/api/v1/users',userRoutes);
// ==================================================================== //

module.exports = app;
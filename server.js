const app=require('./app');
const dotenv=require('dotenv');
const mongoose=require('mongoose')
dotenv.config({path:'./config.env'});

// ==================================================================== //
// Database paleidimas ir connection
const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
try{
    mongoose.connect(DB)
        .then(con=>{
            console.log('Connected to DATABASE')
        })
}catch(err){
    console.log('Error:',err.message)
}
// ==================================================================== //

// ==================================================================== //
// Servako paleidimas
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server runing at port: ${port}`);
})
// ==================================================================== //


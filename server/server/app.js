const express = require('express');
const graphqlHTTP= require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

app.use('/directors-and-films', graphqlHTTP({
    schema,
    graphiql: true,
}));

//** Mongo client connect part
// MongoDB configs
// user-Aram,password-aram1234,db name-movies_db
const MongoDBUrl = `mongodb+srv://Aram:aram1234@cluster0-mge3s.mongodb.net/movies_db?retryWrites=true&w=majority`;

mongoose.connect(MongoDBUrl,{useNewUrlParser:true,useUnifiedTopology:true});

const monCon = mongoose.connection;

// monCon.on('error',(error)=>{
//     console.log('Mongoose is connected !', error);
// });

monCon.once('connected',()=>{
    console.log('Mongoose is connected !');
});

//** Mongo client connect part END /

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});
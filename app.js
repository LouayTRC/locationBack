const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');

// Import Routers : 
const carTypeRouter=require("./routers/carTypeRouter")
const carRouter=require("./routers/carRouter");
const router = require('./routers/carTypeRouter');




mongoose.connect('mongodb+srv://louaytrc:A1z2e3r4@test.y3apa.mongodb.net/?retryWrites=true&w=majority&appName=Test')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());

const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],

  allowedHeaders: [
    ['Content-Type', 'Authorization']
  ],
};

app.use(cors(corsOpts));



// Call your routers Here !!
app.use('/api/carType',carTypeRouter)
app.use('/api/car',carRouter)








app.use((req, res) => {
    res.json({ message: "serveur works" });
});
  
  
module.exports = app;
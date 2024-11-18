const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');

// Import Routers : 
const carRouter=require("./routers/carRouter");
const userRouter=require("./routers/userRouter");
const categoryRouter=require("./routers/categoryRouter");
const marqueRouter=require("./routers/marqueRouter");
const reservationRouter=require("./routers/reservationRouter");
const authRouter=require("./routers/authRouter");
const roleRouter=require("./routers/roleRouter");
const chatRouter=require("./routers/chatRouter");




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
app.use('/api/car',carRouter)
app.use('/api/category',categoryRouter)
app.use('/api/marque',marqueRouter)
app.use('/api/reservation',reservationRouter)
app.use('/api/user',userRouter)
app.use('/api/role',roleRouter)
app.use('/api/auth',authRouter)
app.use('/api/chat',chatRouter)




app.use((req, res) => {
    res.json({ message: "serveur works" });
});
  
  
module.exports = app;
import express from 'express';
const app = express();
import fs from 'fs';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import {handleImage} from './controllers/image.js';
import {handleApiCall} from './controllers/image.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex ({
  client: 'pg',
    connection:{
      connectionString: process.env.DATABASE_URL,
        ssl:true
        // {
        //   rejectUnauthorized: false
        // }
    }
  });

db.select('*').from('users').then(data=>{
	console.log(data);
});

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{res.send('success')})

app.post('/signin',(req,res)=>{handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,()=>{console.log(`sever good to go on port ${process.env.PORT}`)});
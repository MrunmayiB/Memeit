const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

const psql = require('./queries');
const pool = require('./queries');

app.use(cors());

app.use(express.json());


app.use(express.urlencoded({extended:true}));

app.post('/memes',(req,res)=>postMeme(req,res));

app.get('/memes',(req,res)=>get100Meme(req,res));

app.get('/memes/:id',(req,res)=>getMemebyID(req,res));


function postMeme(req,res){
  //  console.log(req.body);
    const {name,url,caption} = req.body;
    pool.query(`INSERT INTO posts (name,url,caption) VALUES ($1,$2,$3) RETURNING id`,[name,url,caption],(error,results)=>{
        if(error)
        {
            //console.log(error);
            res.status(500).send('Database Connection Error');
        }
        else
        {
            res.send(results.rows[0]);
        }
    });
}

function get100Meme(req,res){
    pool.query('SELECT * FROM posts ORDER BY id DESC LIMIT 100',(error,results)=>{
        if(error)
        {
            res.status(500).send('Database Connection Error');
        }
        else
        {
            const rows = results.rows.reverse();
            res.send(rows);
        }
    });
}

function getMemebyID(req,res){
    const id = parseInt(req.params.id,10)
    if(isNaN(id)|| id.toString!=req.params.id)
    {
        res.status(404).send('Not found for id');
        return;
    }
    pool.query('SELECT * FROM posts WHERE id=$1',[id],(error,results)=>{
        if(error)
        {
            res.status(500).send('Database Connection Error');
        }
        else
        {
            if(results.rowCount==0)
            {
                res.status(404).send('Not found for id');
            }
            else
            {
                res.send(results.rows[0]);
            }
        }
    })
}

app.listen(8081,() => console.log('Listening on Port 8081'));
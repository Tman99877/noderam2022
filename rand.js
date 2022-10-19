var express = require('express');
var mongoose = require('mongoose')
var axios = require('axios')
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/static', express.static("public"));
app.set("view engine", "ejs");

const Todo = require('./models/todo.models');
const mongodb = 'mongodb+srv://wallace_tyrese:cz69Jl8MzqgTRr8w@cluster0.bq0gq1u.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB error connection"))


app.get('/', function(req, res){
    let comicData = {}
    axios.get('https://xkcd.com/614/info.0.json').then(function(response){
                Todo.find(function(err, todo){
                    console.log(todo)
                    if(err){
                        res.json({"Error: ": err})
                    } else {
                        res.render('todo.ejs', {todoList: todo, comicData: response.data});
                    }
                })
    }).catch(function(error){
        res.json({"Error: ": error})
    })
    
})


app.listen(3000, function(){
    console.log('App listen on port 3000')
})
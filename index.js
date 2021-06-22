//Using Express
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");
//Init express
const app = express();



//init middleware
//This code runs everytime a page gets a request
// app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Set layout default in views/layout as main
app.set('view engine', 'handlebars'); //Set view engine


// Body parser Middleware
app.use(express.json()); //Handle Raw JSON
app.use(express.urlencoded({extended: false})); //Handle URL encoded

//Homepage Route
//Render title and members into index.handlebars onto main
app.get('/',(req,res) => res.render('index', {
    title: 'Member App',
    members
}));


//Express Version for static folders
app.use(express.static(path.join(__dirname, 'public')));

//Member api routes
app.use('/api/members', require('./routes/api/members'));

//Create your endpoints / route handlers
// app.get(`/`, function(req, res){
//     //Fetch from db
//     // load pages
//     //return json
//     //full access to request and response
//
//     // res.send('<h1>Hello World</h1>');
//
//     res.sendFile(path.join(__dirname,'public', 'index.html'));
// });

const PORT = process.env.PORT || 5000; //Either env or def 5000
//Listen to a port
app.listen(PORT, () => console.log(`Sever started on port ${PORT}`));
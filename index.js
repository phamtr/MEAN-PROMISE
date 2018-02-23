const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const cors = require('cors');
const port = process.env.port || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) =>{
    if(err){
        console.log('Could Not connect to database', err);
    }else{
        //console.log(config.secret);
        console.log('Connected to database: ' + config.db);
    }
});
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(__dirname + '/public'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);

//Connect Server to Angular 2 Index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  });
  
  app.listen(port, () => {
      console.log('Listening on port ' + port);
  });
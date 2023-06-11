var express=new require('express');
var app=express();
var todocontroller=require('./Controllers/todocontroller');
app.set('view engine','ejs');


app.use(express.static('./public'))

//fire controllers
todocontroller(app);

app.listen(3000);

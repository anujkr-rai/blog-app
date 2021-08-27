var express= require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost:27017/RESTfulBlogApp', {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

var BlogSchema= new mongoose.Schema({
    title: String,
    image:String,
    body: String,
    created:{type: Date, default:Date.now}
})

var Blog=mongoose.model("Blog", BlogSchema);

// Blog.create({
//     title: 'Dog',
//     image:"https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     body: "This is a mutt!!",
// })


app.get('/', function(req, res){
    res.redirect('/blogs')
})

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err)
            console.log(err);
        else
            res.render('index', {blogs:blogs});
    })
})


app.listen(3000, function(){
    console.log('Server is running!!!');
});
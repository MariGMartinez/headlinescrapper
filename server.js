//import { Mongoose } from "mongoose";
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");
var cheerio = require ("cheerio");
var request = require ("request")
var express = require("express")
var axios = require ("axios")
//intialize express
var app = express ();
//connect to db

var db = require("./models");

var PORT = 3001;

app.use (bodyParser.urlencoded({extended: true}));
app.use (express.static("public"));
mongoose.connect ("mongodb://localhost/headlinescrapper")
//ROUTES//
app.get ("/scrape",function (req,res){
    //First,we grab the body of the html with request
    axios.get("https://www.inc.com/").then(function(response){
        var $ = cheerio.load (response.data); 
        data = []
        $(".side-hero").each (function(i,element){
            var results = {};
            results.title = $(this)
                .children("h2")
                .text()
            results.link = $(this)
                .children("h2")
                .children("a")
                .attr("href")

            db.Article.create(results)
            .then(function(dbArticle){
                console.log (dbArticle);
            })
            .catch (function(err){
                return res.json (err);
            });
            
            data.push(results);
            console.log(results)
        })
       

        res.send(data)
    });   

});


app.listen(PORT, function(){
    console.log("App running on port"+ PORT + "!");
})
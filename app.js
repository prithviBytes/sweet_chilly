//importing and setting the content
var express = require("express");
var app = express();
var request = require("request");
require('dotenv').config();

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function(req,res){
	res.render("index");
})

app.get("/moogle",function(req,res){
	res.render("index");
})

app.get("/moogle/results",function( req,res){
	var query = req.query.query;
	var url = "http://www.omdbapi.com/?apikey=thewdb&s="+query;
	request(url,function( error, response, body){
		if(!error && response.statusCode == 200) {
            var d = JSON.parse(body);
			var data = d["Search"];
			if (d.Response === "True") {
                res.render("results", {data: data});
            // if not, pass null to the view, which will be handled by ejs to say no movies found
            } else {
                res.render("results", {data: null});
            }
        }else{
			console.log(error);
		}
	})
});

app.get("/moogle/results/detail",function( req, res){
	var id = req.query.id;
	var url = "http://www.omdbapi.com/?apikey=thewdb&i="+id;
	request(url, function(error, response, body){
		if( !error && response.statusCode==200){
			var data = JSON.parse(body);
			res.render("detail",{data : data});
		}else{
			console.log(error);
		}
	})
});

app.listen(process.env.PORT,function(){
	console.log("Movie Server Has Started!!!")
});
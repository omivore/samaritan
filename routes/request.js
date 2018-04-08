	var express = require('express'); 
	var router = express.Router(); 
	const database = require('../model/database'); 
	function restrict(req, res, next) { if (req.session.user) next(); 
		else res.redirect('/login'); } 
	database.loadMongo().then(() => database.createRequest("geocoding", "Jason", "uh idk", 0, Date.now(), coordinates["xfinity-center"]) ).then(data => console.log(data) ).catch(err => console.log(err) ); router.get('/', restrict, function(req, res, next) { res.render('request.pug'); }); router.post('/', (req, res) => { //var text=database.getElementById('input1').value; 
		const title = req.body.title; 
		const author = req.body.username; 
		const content = req.body.content; 
		const needed = req.body.needed; 
		const time = req.body.time; 
		const place = req.body.location; 
		database.createRequest(title, author, content, needed, time, place).then(data => console.log(data)); 
		res.render('request.pug'); }); 
	module.exports = router;
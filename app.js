var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var request = require('request');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));

//GET ALL USERS
app.get('/users', function(req, res) {

	var options = {
			host : 'localhost',
			port : 3000,
			path : '/users',
			method : 'GET',
	};
	// HTTP GET request
	var reqGet = http.request(options, function(response) {
		response.on('data', function(data) {
			var user = JSON.parse(data);
			// res.render('users', {data : user});

			if (user.status === 200) {
				res.render('users', {
					data : user
				});
			} else {
				res.render('try', {
					data : user
				});
			}
		});
	});
	reqGet.end();
	reqGet.on('error', function(e) {
		// console.error(e);
		res.render('try', {
			data : {
				user : "API Server not available......"
			}
		});
	});
});

//DELETE USER BY ID
app.get('/users/delete/:id', function(req, res) {

	var id = req.params.id;
	var options = {
			host : 'localhost',
			port : 3000,
			path : '/users/' + id,
			method : 'DELETE',
	};
	// HTTP GET request
	var reqGet = http.request(options, function(response) {
		response.on('data', function(data) {
			// var user = JSON.parse(data);
			// res.render('try', { data: user });
			res.redirect('/users');
		});
	});
	reqGet.end();
	reqGet.on('error', function(e) {
		// console.error(e);
		res.render('try', {
			data : {
				user : "API Server not available......"
			}
		});
	});
});

//ADD USER PAGE
app.get('/users/add', function(req, res) {
	res.render('add_users');
});

//INSERTING NEW USER
app.post('/users/add', function(req, res) {
	var post_data = {
			firstname : req.body.firstname,
			lastname : req.body.lastname,
			email : req.body.email,
			id : req.body.id
	};

	var db = JSON.stringify(post_data);

	request.post({
		headers : {
			'content-type' : 'application/json'
		},
		url : 'http://localhost:3000/users',
		body : db
	}, function(error, response, res_body) {

		var user = JSON.parse(res_body);

		if (user.status === "200" || user.status === "201") {
			res.redirect('/users');
		} else {
			res.render('try', {
				data : user
			});
		}
	});

});

//GET USER BY ID
app.get('/users/edit/:id', function(req, res) {

	var id = req.params.id;
	var options = {
			host : 'localhost',
			port : 3000,
			path : '/users/' + id,
			method : 'GET',
	};
	// HTTP GET request
	var reqGet = http.request(options, function(response) {
		response.on('data', function(data) {
			var user = JSON.parse(data);
			res.render('edit_users', {
				data : user
			});
		});
	});
	reqGet.end();
	reqGet.on('error', function(e) {
		// console.error(e);
		res.render('try', {
			data : {
				user : "API Server not available......"
			}
		});
	});
});

//UPDATE USER
app.post('/users/edit', function(req, res) {
	var post_data = {
			firstname : req.body.firstname,
			lastname : req.body.lastname,
			email : req.body.email,
			id : req.body.id
	};

	var db = JSON.stringify(post_data);

	request.put({
		headers : {
			'content-type' : 'application/json'
		},
		url : 'http://localhost:3000/users',
		body : db
	}, function(error, response, res_body) {
		var user = JSON.parse(res_body);
		console.log(user.status);
		if (user.status === "200" || user.status === "201") {
			res.redirect('/users');
		} else {
			res.render('try', {
				data : user
			});
		}

	});
});

module.exports = app;

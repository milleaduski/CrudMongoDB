var express		= require('express');
var bodyParser	= require('body-parser');
var app			= express();
var router		= express.Router();
var port 		= process.env.PORT || 3000;

// setting database
var mongoose 	= require('mongoose');
mongoose.connect('mongodb://localhost/apiusers');

var user  = require('./models/user');
// body-parser configuration
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
router.get('/', function(req, res){
	res.json({message: "Welcome to my tutorial, I'm Duski", date: new Date()});
});

router.route('/members')
	.post(function(req, res){
		var user 		= new User();
		user.name		= req.body.name;
		user.password	= req.body.password;
		user.save(function(err){
			if(err) res.send(err);
			res.json({message: 'user successfully added', date: new Date()});
		})
	}).get(function(req, res){
		User.find(function(err, users){
			if(err) res.send(err);
			res.json(users);
		});
	});

router.route('/members/:name')
	.get(function(req, res){
		User.find({name : req.params.name}, function(err, user){
			if(err) res.send(err);
			res.json(user);
		})
	}).put(function(req, res){
		User.update(
			{ name : req.params.name },
			{ name : req.body.name}, 
			function(err){
				if(err) res.send(err);
				res.json({message: 'user successfully updated', date: new Date()});
			});
	}).delete(function(req, res){
		User.remove({name : req.params.name}, function(err){
			if(err) res.send(err);
			res.json({message: 'user successfully deleted', date: new Date()});
		});
	});

// prefix API
app.use('/api', router);

app.listen(port);


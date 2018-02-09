
var express = require('express'),
	router = express.Router(),
	customerSchema = require('../database/schemas/customerSchema.js');

router.get('/',function (req,res,next) {
	res.render('api-home',{title: 'API Home @Express + Angular'});
});

router.route('/customers')
	.get(function (req,res,next) {
		// console.log('GET Request Recieved.',req);
		customerSchema.find({ isActive: true },function (err,users) {
			if(err){
				console.log(err);
			}
			res.json(users);
		});
	})
	.post(function (req,res,next) {
		console.log("POST Request Recieved.",req.body);
		if(req.body){
			var customer = new customerSchema(req.body);
			customer.save(function (err,doc) {
				if (err) {
					console.log(err);
				}
				res.json(doc);
			})
		}
	})
router.route('/customers/:custId')
	.get(function (req,res,next) {
		console.log("GET Request Recieved.",req.params.custId);
		var custId = req.params.custId;
		if (custId && custId.length) {
			customerSchema.findById(custId,function(err,doc){
				if(err){
					next(err);
				}
				res.json(doc);
			})
		}
	})
	.put(function (req,res,next) {
		console.log("PUT Request Recieved.", req.params.custId);
		var custId = req.params.custId;
		if(custId && custId.length && req.body){
			var customer = {
				name: req.body.name,
				age: req.body.age,
				phone: req.body.phone,
				email:req.body.email,
				dob: req.body.dob,
				service: req.body.service,
				designation: req.body.designation,
				star: req.body.star,
				updatedAt: req.body.updatedAt
			};
			customerSchema.findByIdAndUpdate(custId,{ $set: customer},{new: true}, function(err,doc){
				if(err){
					next(err);
				}
				res.json(doc)
			})
		}
	})
	.delete(function (req,res,next) {
		console.log("Delete Request Recieved.",req.params.custId);
		var custId = req.params.custId;
		if (custId && custId.length) {
			customerSchema.findByIdAndRemove(custId,function(err,doc){
				if(err){
					next(err);
				}
				console.log(doc);
				res.send({_id : custId})
			})
		}
	})


module.exports = router;
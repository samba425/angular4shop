const mongoose = require('mongoose');
const schema = mongoose.Schema;


var product = new schema({
	title: {type:String},
	price: { type: Number},
	category: { type: String},
	imageUrl: { type: String}
});

module.exports = mongoose.model('product',product);
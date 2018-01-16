const mongoose = require('mongoose');
const schema = mongoose.Schema;



var cart = new schema( {

	CreatedDate : { type: String },
	items : [  
	{}
		
    ]
	
}) 


 

module.exports  = mongoose.model('shoppingcart',cart);
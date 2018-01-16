var httpStatusCode = require('../../constants/constants'),
  products = require('../../model/createProduct'),
  shoppingCarts = require('../../model/shoppingcart');

//route products
module.exports.addProducts = addProducts;
module.exports.updateProducts = updateProducts;
module.exports.addProducts = addProducts;
module.exports.getProducts = getProducts;
module.exports.deleteProduct = deleteProduct;
// route productsByType
module.exports.getProductsBytype = getProductsBytype;
module.exports.shoppingCart = shoppingCart;
module.exports.getCart = getCart;
module.exports.getCarts = getCarts;
// route productsChangeActive
module.exports.updateProductActive = updateProductActive;


function shoppingCart(req, res, next) {
  console.log("cart", req.body)
  req.session.userId = req.body.dateCreated
  console.log("req.session.cart", req._id)
  cart = new shoppingCarts({
    CreatedDate: req.body.dateCreate,
    items: req.body.items
  });
  cart.save(function(err, data) {
    if (err) return res.status(httpStatusCode.DBERROR).send(err);
    res.json({ success: true, msg: data });
  });

}

function getCarts(req, res, next) {
  console.log("get cart dta")
  console.log("cart", req.params)
  if (req.params.id) {
    //      db.sof_table.aggregate
    // ([
    // {$unwind:'$TAGS'}, 
    // {$match:{'TAGS.NAME':{$in:['answer','question']}}},
    // {$group:{_id:'$URL',TAGS:{$push:'$TAGS'}}}
    // ])
    shoppingCarts.find({ "_id": req.params.id }).exec(function(err, cartDetail) {
      console.log("getprodyuctsss", cartDetail)
      if (err) return res.status(httpStatusCode.DBERROR).send(err);
      if (cartDetail) {
        console.log("my cart deaTails", cartDetail)
        res.json({ success: true, msg: 'Cart updated sucessfully', data: cartDetail });
      } else {
        res.json({ success: true, msg: 'Cart detail not found' });
      }
    });
  } else {
    res.json({ success: false, msg: 'ID is undefined' });
  }

}

function getCart(req, res, next) {
  console.log("get cart dta")
  console.log("cart", req.params)
  if (req.params.id) {
    //      db.sof_table.aggregate
    // ([
    // {$unwind:'$TAGS'}, 
    // {$match:{'TAGS.NAME':{$in:['answer','question']}}},
    // {$group:{_id:'$URL',TAGS:{$push:'$TAGS'}}}
    // ])
    shoppingCarts.aggregate([
      { $unwind: '$items' },
      { $match: { 'items._id': { $in: [req.params.productid] } } },
      { $group: { _id: '_id', items: { $push: '$items' } } }
    ]).exec(function(err, cartDetail) {
      console.log("getprodyuctsss", cartDetail)
      if (err) return res.status(httpStatusCode.DBERROR).send(err);
      if (cartDetail) {
        console.log("my cart deaTails", cartDetail)
        res.json({ success: true, msg: 'Cart updated sucessfully', data: cartDetail });
      } else {
        res.json({ success: true, msg: 'Cart detail not found' });
      }
    });
  } else {
    res.json({ success: false, msg: 'ID is undefined' });
  }

}

function addProducts(req, res, next) {
  console.log(req.body)
  newProduct = new products({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    imageUrl: req.body.imageUrl

  });
  newProduct.save(function(err, data) {
    if (err) return res.status(httpStatusCode.DBERROR).send(err);
    res.json({ success: true, msg: req.body.title + 'Product added sucessfully' });
  });


}

function addProducts(req, res, next) {
    console.log("11111111111111111111111111111111111111111111")
  var datasss = req.body;
  if (req.params.id) {
    console.log("two")
    shoppingCarts.findOne({ '_id': req.params.id})
      .exec(function(err, productDetail) {
        if (err) return res.status(httpStatusCode.DBERROR).send(err);
        if (productDetail) { 
          productDetail.items.push({
              "_id": req.params.productid,
              "title": req.body.title,
              "imageUrl": req.body.imageUrl,
              "price": req.body.price,
              "quantity": req.body.quantity

          })

          productDetail.save(function(err, data) {
              if (err) {
                console.log("err while update",err)
              } else {
                 console.log("final231312312312312312", data)
              res.json({ success: true, msg: productDetail + ' updated sucessfully', data: data });
               
              }
              // this.getCart(data.); ;
          });

        } else {
          res.json({ success: true, msg: 'Product detail not found' });
        }
      });
  } else {
    res.json({ success: false, msg: 'Product ID is undefined' });
  }
}


function updateProducts(req, res, next) {
  var datasss = req.body;
  if (req.params.id) {
    console.log("two")
    shoppingCarts.find({ '_id': req.params.id, 'items._id': req.params.productid })
      .exec(function(err, productDetail) {
        if (err) return res.status(httpStatusCode.DBERROR).send(err);
        if (productDetail) {
          shoppingCarts.update({ '_id': req.params.id, "items._id": req.params.productid }, {
            '$set': {
              'items.$.quantity': req.body.quantity
            }
          }, { new: true }, (err, cart) => {
            if (err) {
              console.log("err", err)
            } else {
               shoppingCarts.find({ "_id": req.params.id }).exec(function(err, cartDetail) {
      console.log("getprodyuctsss", cartDetail)
      if (err) return res.status(httpStatusCode.DBERROR).send(err);
      if (cartDetail) {
        console.log("my cart deaTails", cartDetail)
        res.json({ success: true, msg: 'Cart updated sucessfully', data: cartDetail });
      } else {
        res.json({ success: true, msg: 'Cart detail not found' });
      }
    }); 
            }
          })
          //                         shoppingCarts.findByIdAndUpdate( 
          // { _id: req.params.productid },
          //        {$set : {
          //          items : {
          //            title : req.body.title,
          //     imageUrl: req.body.imageUrl,
          //     price : req.body.price,
          //     quantity : 100
          //            }
          //       }
          //     }
          // )  

          // shoppingCarts.aggregate([
          //     { $unwind: '$items' },
          //     { $match: { 'items._id': { $in: [req.params.productid] } } },
          //     { $group: { _id: '_id', items: { $push: '$items' } } }
          // ]).exec(function(err, cartDetail) {
          //     console.log("cartDetailss1321312", cartDetail)
          // });

          // productDetail.items.push({
          //     "_id": req.params.productid,
          //     "title": req.body.title,
          //     "imageUrl": req.body.imageUrl,
          //     "price": req.body.price,
          //     "quantity": req.body.quantity

          // })

          // productDetail.save(function(err, data) {
          //     if (err) return res.status(httpStatusCode.DBERROR).send(err);
          //     console.log("final", data)
          //     res.json({ success: true, msg: productDetail + ' updated sucessfully', data: data });
          // });

        } else {
          res.json({ success: true, msg: 'Product detail not found' });
        }
      });
  } else {
    res.json({ success: false, msg: 'Product ID is undefined' });
  }
}

function getProducts(req, res, next) {
  products.find().exec(function(err, productsDetails) {
    if (err) return res.status(httpStatusCode.DBERROR).send(err);
    else res.json({ success: true, data: productsDetails });
  });
}

function deleteProduct(req, res, next) {
    shoppingCarts.update({ _id: req.params.id }, { "$pull": { "items": { "_id": req.params.productid } }}, { safe: true, multi:true }, function(err, obj) {
    //do something smart
});

          //  shoppingCarts.items.pull({
          //     "_id": req.params.productid,
          //     "title": req.body.title,
          //     "imageUrl": req.body.imageUrl,
          //     "price": req.body.price,
          //     "quantity": req.body.quantity

          // })

          // shoppingCarts.save(function(err, data) {
          //     if (err) return res.status(httpStatusCode.DBERROR).send(err);
          //     console.log("final", data)
          //     res.json({ success: true, msg: productDetail + ' updated sucessfully', data: data });
          // });
 
}

function getProductsBytype(req, res, next) {
  productsCollection.find().then(function(productsDetails, err) {
    console.log("get products", productsDetails)
    if (err) return res.status(httpStatusCode.DBERROR).send(err);
    if (productsDetails.length > 0) res.json({ success: false, msg: 'No Products' });
    else res.json({ success: true, data: productsDetails });
  });

}

function updateProductActive(req, res, next) {
  if (req.query._id) {
    productsCollection.findOne({ '_id': req.query._id })
      .exec(function(err, productDetail) {
        if (err) return res.status(httpStatusCode.DBERROR).send(err);
        if (productDetail != null) {
          productDetail.status = !productDetail.status;

          productDetail.save(function(err, data) {
            if (err) return res.status(httpStatusCode.DBERROR).send(err);
            res.json({ success: true, msg: 'Status of ' + productDetail.name + ' is ' + data.status, data: data });
          });

        } else {
          res.json({ success: true, msg: 'Product detail not found' });
        }
      });
  } else {
    res.json({ success: false, msg: 'Product ID is undefined' });
  }
}

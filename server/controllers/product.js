const Product = require('../models/product')
const slugify = require("slugify");


exports.create = async (req, res) => {
    try {
        console.log(req.body);  // we verify data sent from the frontend is recieved in the backend
        req.body.slug = slugify(req.body.title)
        const newProduct = await new Product(req.body).save()
        res.json(newProduct);

    } catch (err) {
        console.log("ERROR CREATING PRODUCT ---> ", err);
        // res.status(400).send("Create product failed");
        res.status(400).json({
            err: err.message,

        })
    }
};

exports.listAll = async (req, res) =>
    res.json(await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subs')
        .sort([['createdAt', 'desc']])
        .exec());

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({slug: req.params.slug}).exec();
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Category delete failed");
    }
}
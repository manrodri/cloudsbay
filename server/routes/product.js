const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { create, listAll, remove } = require("../controllers/product");


// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/product/:count", listAll); // product/10 we don't want to send potentially thousands of  products at once
// router.get("/category/:slug", read);
// router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/product/:slug", authCheck, adminCheck, remove);

module.exports = router;
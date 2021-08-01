const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controllers
const { create } = require("../controllers/product");


// routes
router.post("/product", authCheck, adminCheck, create);
// router.get("/category", list);
// router.get("/category/:slug", read);
// router.put("/category/:slug", authCheck, adminCheck, update);
// router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
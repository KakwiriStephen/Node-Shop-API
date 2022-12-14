const express = require("express");
const mongoose = require("mongoose");
const Product = require("../../models/products");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products",
  });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    // _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Handling POST requests to /products",
        createdProduct: product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/* try {
    let id = { _id: req.params.id };
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not Found in the DB!",
      });
    }
    return res.status(200).json({
      success: true,
      data: form,
    }); */

router.get("/:productId", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json({ doc });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  res.status(201).json({
    message: "product Updated",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "product deleted",
  });
});

module.exports = router;

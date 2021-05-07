const express = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/products");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { from, limit } = req.query;

  const products = await getProducts(from, limit);
  res.json(products);
});

router.post("/", async (req, res, next) => {
  try {
    const result = await addProduct(req.body);
    if (!result) throw new Error("something wen wrong");
    res.status(200).json({
      msg: "insert succsses",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
});

router.put("/:id", async (req, res, next) => {
  console.log(req.params.id);
  try {
    const result = await editProduct(req.params.id, req.body);
    if (!result) throw new Error("something wen wrong");
    res.status(200).json({
      msg: "edit succsses",
      result: result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  console.log(req.params.id);
  try {
    const result = await deleteProduct(req.params.id);
    if (!result) throw new Error("something wen wrong");
    console.log("deleteProduct succsses");
    res.status(200).json({
      msg: "deleteProduct succsses",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
});

// router.post("/", async (req, res, next) => {
//     const { owner, reservations, restarant, ...rest } = req.body;
//     // PARTIAL NOT WORKING YET
//     const restDetails = await RestModel.find({ name: restarant });
//     const { _id } = restDetails;
//     const order = new OrderModel({ restaruant: _id })
//     const orders = await getOrders();
//     res.json(orders)
// })

module.exports = router;

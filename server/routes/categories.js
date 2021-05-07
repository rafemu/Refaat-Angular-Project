const express = require("express");
const { getCategories } = require("../controllers/categories");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const categories = await getCategories();
  res.json(categories);
});

module.exports = router;

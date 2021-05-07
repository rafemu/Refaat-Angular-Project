const ProductsModel = require("../models/productsSchema");
const CategoryModel = require("../models/categorySchema");

async function getCategories() {
  const result = await CategoryModel.find({}, { __v: false });
  return result;
}

module.exports = {
  getCategories,
};

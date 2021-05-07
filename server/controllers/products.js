const ProductsModel = require("../models/productsSchema");
const CategoryModel = require("../models/categorySchema");

async function getProducts(from, limit) {
  const result = await ProductsModel.find({}, { __v: false })
    .populate("categoryId", "name", CategoryModel)
    .limit(Number(limit))
    .skip(Number(from));
  return result;
}

async function addProduct(productDetails) {
  const productObj = {
    name: productDetails.name.toLowerCase(),
    categoryId: productDetails.categoryId,
    description: productDetails.description.toLowerCase(),
    price: productDetails.price,
    picture: productDetails.picture,
  };
  const result = await ProductsModel.create(productObj);
  return result;
}

async function editProduct(id, productDetails) {
  const result = await ProductsModel.findOneAndUpdate(
    { _id: id },
    productDetails,
    {
      new: true,
      useFindAndModify: false,
    }
  );
  return result;
}

async function deleteProduct(id) {
  const result = await ProductsModel.findByIdAndDelete(id);
  return result;
}

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
};

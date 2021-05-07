require("dotenv").config();
const createConnection = require("../connection/index");
const ProductsModel = require("../models/productsSchema");
const CategoriesModel = require("../models/categorySchema");
createConnection();

setTimeout(() => {
  // insertCategoriesToDB();
  insertproductsToDB();
}, 1000);

async function insertCategoriesToDB() {
  try {
    const resultFind = await CategoriesModel.find();
    if (resultFind.length) return;
    const result = await CategoriesModel.insertMany(getCategoriesData());
    console.log(result);
  } catch (ex) {
    console.log(ex);
  } finally {
    // process.exit(0)
  }
}

async function insertproductsToDB() {
  try {
    const resultFind = await ProductsModel.find();
    const restResult = await CategoriesModel.find();
    if (resultFind.length) return;
    const result = await ProductsModel.insertMany(
      getproductData(restResult[1]._id)
    );
    console.log(result);
  } catch (ex) {
    console.log(ex);
  } finally {
    // process.exit(0)
  }
}

function getCategoriesData() {
  return [
    { name: "Milk & Eggs" },
    { name: "Meat & Fish" },
    { name: "Vegetables & fruits" },
  ];
}

function getproductData(id) {
  return [
    {
      name: "brown eggs",
      categoryId: id,
      description: "Raw organic brown eggs in a basket",
      price: 99,
      picture:
        "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1486/cached.offlinehbpl.hbpl.co.uk/news/OMC/all-products-20170125054108782.gif",
    },
    {
      name: "sweet fresh stawberry",
      categoryId: id,
      description: "Sweet fresh stawberry on the wooden table",
      price: 50,
      picture:
        "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1486/cached.offlinehbpl.hbpl.co.uk/news/OMC/all-products-20170125054108782.gif",
    },
    {
      name: "asparagus",
      categoryId: id,
      description: "Asparagus with ham on the wooden table",
      price: 10,
      picture:
        "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1486/cached.offlinehbpl.hbpl.co.uk/news/OMC/all-products-20170125054108782.gif",
    },
    {
      name: "green smoothie",
      categoryId: id,
      description:
        "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
      price: 100,
      picture:
        "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1486/cached.offlinehbpl.hbpl.co.uk/news/OMC/all-products-20170125054108782.gif",
    },
  ];
}

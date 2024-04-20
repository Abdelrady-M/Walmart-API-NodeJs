var productModel = require(`../models/product`);

/* ================================  save product ================================ */

var saveProduct = async (req, res) => {
  var product = req.body;
  try {
    var newProduct = await productModel.create(product);
    res
      .status(200)
      .json({ message: "your product is created", data: newProduct });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================================ get proudect  ================================*/

let query = {};
const getProducts = async (req, res) => {
  try {
    let mongooseQuery = productModel.find(query);
    console.log(
      "product count ",
      await productModel.find(query).countDocuments()
    );
    // this funciton for retrive aall products length
    // async function getLengthOfProducts() {
    //   const products = await mongooseQuery.toArray();
    //   const length = products.length;
    //   return length;
    // }

    // const length = await getLengthOfProducts();
    // conosle.log("length", length);

    // Filtering and excluding query parameters
    const {
      page,
      limit,
      sort,
      fields,
      keyword,
      priceMin,
      priceMax,
      color,

      ...filters
    } = req.query;
    // console.log("this is filters ", filters);
    // Apply filters (excluding pagination, sorting, fields, and cd)
    for (const key in filters) {
      mongooseQuery = mongooseQuery.where(key, filters[key]);
    }

    // Pagination
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(limit) || 12;
    const skip = (currentPage - 1) * perPage;

    mongooseQuery = mongooseQuery.skip(skip).limit(perPage);
    // .find(JSON.parse(queryStr));
    //
    // Sorting
    if (sort) {
      mongooseQuery = mongooseQuery.sort(sort.split(",").join(" "));
    } else {
      mongooseQuery = mongooseQuery.sort("-createdAt");
    }

    // Field selection
    if (fields) {
      mongooseQuery = mongooseQuery.select(fields.split(",").join(" "));
    } else {
      mongooseQuery = mongooseQuery.select("-__v");
    }

    if (priceMin && priceMax) {
      mongooseQuery = mongooseQuery.where("price").gte(priceMin).lte(priceMax);
    }
    if (color) {
      const colorsArray = Array.isArray(color) ? color : [color];
      mongooseQuery = mongooseQuery.where("colors").in(colorsArray);
    }

    // Search
    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i"); // Case-insensitive search
      mongooseQuery = mongooseQuery.or([
        { title: keywordRegex },
        { description: keywordRegex },
      ]);
    }

    const products = await mongooseQuery.exec();

    res
      .status(200)
      .json({ results: products.length, page: currentPage, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================================ get proudect by id ================================*/

var getProductById = async (req, res) => {
  var { id } = req.params;
  try {
    var product = await productModel.findOne({ _id: id });
    res.status(200).json({ data: product });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* ================================ get proudect by category ================================*/

var getProductsByCategory = async (req, res) => {
  var { categoryName } = req.params;
  try {
    var products = await productModel.find({ category: categoryName });
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* ================================ update product ================================  */

var updateProduct = async (req, res) => {
  var { id } = req.params;
  try {
    var updatedProduct = await productModel.updateOne({ _id: id }, req.body);
    res.status(200).json({ message: "your product is updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ================================ Delete product ================================  */

var deletProduct = async (req, res) => {
  var { id } = req.params;
  try {
    await productModel.deleteOne({ _id: id });
    res.status(200).json({ message: "your product is deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const searchProducts = async (req, res) => {
  const { q } = req.query;
  const searchQuery = q || '';
  try {
    const products = await productModel.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    });
    res.status(200).json({ results: products.length, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
var productsCreatedPerMonth = async (req, res) => {
  // Get the current date
  const currentDate = new Date();

  // Calculate the date 12 months ago
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11); // Subtracting 11 because the current month is included
  try {
    productCount = await productModel.count({});
    await productModel
      .aggregate([
        {
          $match: {
            createdAt: { $gte: twelveMonthsAgo, $lte: currentDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            count: 1,
          },
        },
      ])
      .exec((err, result) => {
        if (err) {
          console.error(err);
          // Handle the error
        } else {
          res.status(201).json({ result, productCount });
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error" });
  }
};

module.exports = {
  getProducts,
  saveProduct,
  getProductById,
  updateProduct,
  deletProduct,
  searchProducts,
  productsCreatedPerMonth
};

import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

import { errorResponse, successResponse } from "./responseController.js";

// return all products
export const getAllProducts = async (request, response) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const maxPrice = request.query.maxPrice;
    let filteredProduct;
    if (maxPrice) {
      filteredProduct = products.filter((product) => product.price <= maxPrice);
      successResponse(
        response,
        200,
        `reutrn all products base on maximum price`,
        filteredProduct
      );
    } else {
      successResponse(response, 200, `reutrn all products`, products);
    }
  } catch (error) {
    errorResponse(response, 500, error.message);
  }
};

// add a new products
export const addSingleProduct = async (request, response) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const newProduct = {
      id: new Date().getMilliseconds().toString(),
      title: request.body.title,
      price: request.body.price,
    };
    products.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(products));
    successResponse(response, 201, `product is added`);
  } catch (error) {
    errorResponse(response, 500, error.message);
  }
};

// return a product
export const getSingleProduct = async (request, response) => {
  try {
    const id = request.params.id;
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const product = products.find((product) => product.id === id);
    if (!product) {
      errorResponse(response, 404, `product with id ${id} not found`);
    }
    successResponse(response, 200, `reutrn a product with id ${id}`, product);
  } catch (error) {
    errorResponse(response, 500, error.message);
  }
};

// delete a product
export const deleteSingleProduct = async (request, response) => {
  try {
    const id = request.params.id;
    let products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const product = products.find((product) => product.id === id);
    if (!product) {
      errorResponse(response, 404, `product with id ${id} not found`);
    }
    const filteredProducts = products.filter((product) => product.id !== id);
    products = filteredProducts;
    await fs.writeFile("products.json", JSON.stringify(products));

    successResponse(response, 204, `deleted product with id ${id}`);
  } catch (error) {
    errorResponse(response, 500, error.message);
  }
};

// update a product
export const updateSingleProduct = async (request, response) => {
  try {
    const id = request.params.id;
    let products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    const { title, price } = request.body;

    const index = products.findIndex((product) => product.id === id);
    if (index < 0) {
      errorResponse(response, 404, `product with id ${id} not found`);
    }
    if (title) {
      products[index].title = title;
    }
    if (price) {
      products[index].price = price;
    }

    await fs.writeFile("products.json", JSON.stringify(products));

    successResponse(
      response,
      200,
      `updated product with id ${id}`,
      products[index]
    );
  } catch (error) {
    errorResponse(response, 500, error.message);
  }
};

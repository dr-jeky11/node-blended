import fs from "node:fs/promises";
import { createFakeProduct } from "../utils/createFakeProduct.js";
import { PATH_DB } from "../constants/path.js";

export const generateProducts = async (number) => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(data);
    for (let index = 0; index < number; index++) {
      products.push(createFakeProduct());
    }
    await fs.writeFile(PATH_DB, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.log(error.message);
  }
};

generateProducts(1);

import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const getExpensiveProducts = async () => {
  const price = 400;
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(data);
    const expensiveProducts = products.filter(
      (product) => product.price >= price
    );
    console.log(expensiveProducts);
  } catch (error) {
    console.log(error.message);
  }
};

getExpensiveProducts();

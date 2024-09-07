import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const getTotalPrice = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(data);
    const totalPrice = products.reduce(
      (total, product) => (total += Number(product.price)),
      0
    );
    console.log(totalPrice);
  } catch (error) {
    console.log(error.message);
  }
};

getTotalPrice();

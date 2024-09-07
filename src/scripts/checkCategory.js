//чи всі дорівнюють категорії
import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const checkCategory = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(data);
    const result = products.every(
      (product) => product.category === products[0].category
    );
    console.log(result);
  } catch (error) {
    console.error("eror:", error);
  }
};
checkCategory();

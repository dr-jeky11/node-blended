import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";

export const transformArray = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(data);
    const newProducts = products.map(({ description, ...item }) => {
      return item;
    });
    await fs.writeFile(PATH_DB, JSON.stringify(newProducts, null, 2));
  } catch (error) {
    console.error("error", error);
  }
};
transformArray();

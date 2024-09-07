import fs from "node:fs/promises";
import { PATH_DB } from "../constants/path.js";
import path from "node:path";

export const createFiles = async () => {
  try {
    const data = await fs.readFile(PATH_DB, "utf-8");
    const products = JSON.parse(data);
    products.forEach((product, index) => {
      const filePath = path.join(
        process.cwd(),
        "src",
        "files",
        `${index + 1}.json`
      );
      fs.writeFile(filePath, JSON.stringify(product, null, 2), 'utf-8')
    });
  } catch (error) {
    console.log(error);
  }
};

createFiles()

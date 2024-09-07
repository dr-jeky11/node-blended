import { PATH_FILES } from "../constants/path.js";
import fs from "node:fs/promises";

export const getFiles = async() => {
    try {
        const files = await fs.readdir(PATH_FILES)
        files.forEach((file) => {
            console.log(file);
        })
    } catch (error) {
        console.log(error);
    }
}

getFiles()
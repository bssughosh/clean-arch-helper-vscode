import { existsSync, writeFile } from "fs";
import path = require("path");

export function writeDataToFile(
  targetDirectory: string,
  fileName: string,
  dataToWrite: string
) {
  const filePath = path.join(`${targetDirectory}`, fileName);
  if (existsSync(filePath)) {
    throw Error(`${fileName} already exists`);
  }

  writeFile(filePath, dataToWrite, function () {});
}

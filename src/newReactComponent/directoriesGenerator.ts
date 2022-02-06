import * as _ from "lodash";
import * as mkdirp from "mkdirp";
import { existsSync } from "fs";

export const generateReactDirectories = async (
  featureName: string,
  targetDirectory: string
): Promise<void> => {
  const targetPath = `${targetDirectory}/${featureName}`;

  if (!existsSync(targetPath)) {
    await mkdirp(targetPath);
  }
};

import * as _ from "lodash";
import * as mkdirp from "mkdirp";
import { existsSync } from "fs";
import { FlutterFeatureType } from "../utils/enums";


export const generateFlutterDirectories = async (
    snakeCaseFeatureName: string,
    targetDirectory: string,
    type: FlutterFeatureType,
): Promise<void> => {
    const targetPath = `${targetDirectory}/${snakeCaseFeatureName}`
    const dataPath1 = `${targetPath}/data/mapper`
    const dataPath2 = `${targetPath}/data/repository`
    const domainPath1 = `${targetPath}/domain/usecase`
    const domainPath2 = `${targetPath}/domain/entity`
    const domainPath3 = `${targetPath}/domain/repository`
    const presentationPath = `${targetPath}/presentation`

    if (type == FlutterFeatureType.full) {
        // Main dir
        if (!existsSync(targetDirectory)) {
            await mkdirp(targetDirectory);
        }

        // Respective folders
        await mkdirp(dataPath1);
        await mkdirp(dataPath2);
        await mkdirp(domainPath1);
        await mkdirp(domainPath2);
        await mkdirp(domainPath3);
        await mkdirp(presentationPath);
    } else {
        if (!existsSync(targetPath)) {
            await mkdirp(targetPath);
        }
    }
};
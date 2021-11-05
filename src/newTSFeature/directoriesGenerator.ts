import * as _ from "lodash";
import * as mkdirp from "mkdirp";
import { existsSync } from "fs";
import { FlutterFeatureType, TSFeatureType } from "../utils/enums";


export const generateTSDirectories = async (

    snakeCaseFeatureName: string,
    targetDirectory: string,
    type: TSFeatureType,


): Promise<void> => {

    if (type == TSFeatureType.NEW_OPERATION) {

        //target Directory would start from src

        const targetPath = `${targetDirectory}/${snakeCaseFeatureName}`

        //target Path : src/studentOperations

        const dataPathMapper = `${targetPath}/data/mapper`
        const dataPathRepositoryImpl = `${targetPath}/data/repository`
        const dataPathWrapper = `${targetPath}/data/wrapper`


        const domainPathUsecase = `${targetPath}/domain/usecase`
        const domainPathEntity = `${targetPath}/domain/entity`
        const domainPathRepository = `${targetPath}/domain/repository`

        const gateWayPath = `${targetPath}/gateway`

        if (!existsSync(targetDirectory)) {
            await mkdirp(targetDirectory);
        }

        // Respective folders
        await mkdirp(dataPathMapper);
        await mkdirp(dataPathRepositoryImpl);
        await mkdirp(dataPathWrapper);

        await mkdirp(domainPathUsecase);
        await mkdirp(domainPathEntity);
        await mkdirp(domainPathRepository);

        await mkdirp(gateWayPath);

    }

    else{

        //target Directory would start from an existing file in src Eg : src/studentOperations


        const targetPath = `${targetDirectory}/gateway/${snakeCaseFeatureName}`

        if (!existsSync(targetDirectory)) {
            await mkdirp(targetDirectory);
        }


    }


};



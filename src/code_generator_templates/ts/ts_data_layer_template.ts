
export function getTSDataLayerRepositoryCodeTemplate(
    featureClassName: string,
    snakeCaseFeatureName: string,
): string {
    
    const template = `
    
import {  inject, injectable } from "inversify";
import { ${featureClassName}Repository } from "../../domain/repository/${snakeCaseFeatureName}sRepository";


@injectable()

export class ${featureClassName}RepositoryImpl implements ${featureClassName}Repository {

    constructor(

        //@inject(${featureClassName}FirestoreWrapper) private readonly ${snakeCaseFeatureName}FirestoreWrapper: ${featureClassName}FirestoreWrapper,

    ) { }

}
    `;

    return template;
};
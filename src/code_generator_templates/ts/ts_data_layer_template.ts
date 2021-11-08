
export function getTSDataLayerRepositoryCodeTemplate(
    featureClassName: string,
    snakeCaseFeatureName: string,
): string {
    
    const template = `
    
import {  inject, injectable } from "inversify";
import { ${featureClassName}Repository } from "../../domain/repository/${snakeCaseFeatureName}Repository";
import { ${featureClassName}FirestoreWrapper } from "./${snakeCaseFeatureName}FirestoreWrapper";



@injectable()

export class ${featureClassName}RepositoryImpl implements ${featureClassName}Repository {

    constructor(

        @inject(${featureClassName}FirestoreWrapper) private readonly ${snakeCaseFeatureName}FirestoreWrapper: ${featureClassName}FirestoreWrapper,

    ) { }

}
    `;

    return template;
};





export function getTSDataLayerFirestoreWrapperCodeTemplate(
    featureClassName: string,
): string {
    
    const template = `
    
import { inject, injectable } from "inversify";
import { ConfigWrapper } from "../../../Config";
    
@injectable()
export class ${featureClassName}FirestoreWrapper {
    
    constructor(
        @inject('ConfigWrapper') private readonly config: ConfigWrapper
    ) { }
    

}`;

return template;

};
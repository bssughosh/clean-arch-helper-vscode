


export function getTSOrchestratorCodeTemplate(featureClassName: string, snakeCaseFeatureName: string): string {
    const template = 
    
    `
    import { container } from "../../../inversify.config";
    
    import { ${featureClassName}RequestDeserializer } from "./${snakeCaseFeatureName}RequestDeserializer";
    
    
    export const ${snakeCaseFeatureName}Orchestrator = async (data: any) => {
    
        const ${snakeCaseFeatureName}RequestDeserializer: ${featureClassName}RequestDeserializer = container.get(${featureClassName}RequestDeserializer);
    
        const ${snakeCaseFeatureName}RequestSerializer : ${featureClassName}RequestSerializer = container.get(${featureClassName}RequestSerializer)
    
    
    }`;

    return template;
};

export function getTSDeserializerCodeTemplate(featureClassName: string): string {

    const template = 
    
    `
    import { injectable } from "inversify";
    import { InvalidRequestArguments } from "../../../core/errors/errors";
    
    
    @injectable()
    export class ${featureClassName}RequestDeserializer {
    
    
        deserialize(data: any) : {
    
            if (!("" in data)) {
    
                throw new InvalidRequestArguments("Missing field value :");
    
            }
    
            if (!(typeof data. === "string")) {

                throw new InvalidRequestArguments('Invalid type of field () in Request. Expected to be a string');
            }
            
            
        }
    
       
    }`;

    return template;
};

export function getTSSerializerCodeTemplate(featureClassName: string): string {
    
    const template = 
    
    `
import { injectable } from "inversify";
    
@injectable()
export class ${featureClassName}RequestSerializer {
    
    serialize(data: ): { [x: string]: any } {
    
        const serializedData: { [x: string]: any } = {}
    
        if () {
            serializedData. = data.
        }
    
        return serializedData;
    }
}
    `;

    return template;
};


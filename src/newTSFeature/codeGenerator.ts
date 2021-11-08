import { getTSDataLayerFirestoreWrapperCodeTemplate, getTSDataLayerRepositoryCodeTemplate } from "../code_generator_templates/ts/ts_data_layer_template";
import { getTSDomainLayerCodeTemplate } from "../code_generator_templates/ts/ts_domain_layer_template";
import { getTSDeserializerCodeTemplate, getTSOrchestratorCodeTemplate, getTSSerializerCodeTemplate } from "../code_generator_templates/ts/ts_gateway_layer_template";
import { TSFeatureType } from "../utils/enums";
import { writeDataToFile } from "../utils/writeDataToFile";

export const generateTSCode = (

    featureClassName: string,
	snakeCaseFeatureName: string,
	targetDirectory: string,
    type: TSFeatureType,


): void => {


	if (type == TSFeatureType.NEW_OPERATION) {

        const targetPath = `${targetDirectory}/${snakeCaseFeatureName}`


		generateDataLayerCode(`${targetPath}/data/repository`, featureClassName, snakeCaseFeatureName);

		generateDomainLayerCode(`${targetPath}/domain/repository/`, featureClassName,snakeCaseFeatureName);

	} else {

        const targetPath = `${targetDirectory}/gateway/${snakeCaseFeatureName}`

        generateGateWayLayerCode(targetPath, featureClassName, snakeCaseFeatureName);
	}	

}

function generateDataLayerCode(
	targetDirectory: string,
	featureClassName: string,
	snakeCaseFeatureName: string,
) {
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}RepositoryImpl.ts`,
		getTSDataLayerRepositoryCodeTemplate(featureClassName, snakeCaseFeatureName)
	);

	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}FirestoreWrapper.ts`,
		getTSDataLayerFirestoreWrapperCodeTemplate(featureClassName)
	)
}



function generateDomainLayerCode(
	targetDirectory: string,
	featureClassName: string,
    snakeCaseFeatureName: string
) {
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}Repository.ts`,
		getTSDomainLayerCodeTemplate(featureClassName)
	);
}

function generateGateWayLayerCode(
	targetDirectory: string,
	featureClassName: string,
	snakeCaseFeatureName: string,
) { 
	writeDataToFile(
		targetDirectory,
		`index.ts`,
		getTSOrchestratorCodeTemplate(featureClassName, snakeCaseFeatureName)
	);

	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}RequestDeSerializer.ts`,
		getTSDeserializerCodeTemplate(featureClassName)
	);

	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}RequestSerializer.ts`,
		getTSSerializerCodeTemplate(featureClassName)
	);
	
}



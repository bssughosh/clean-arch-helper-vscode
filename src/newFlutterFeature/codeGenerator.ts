import { getFlutterDataLayerCodeTemplate } from "../code_generator_templates/flutter/flutter_data_layer_template";
import { getFlutterDomainLayerCodeTemplate } from "../code_generator_templates/flutter/flutter_domain_layer_template";
import { getFlutterControllerCodeTemplate, getFlutterPresenterCodeTemplate, getFlutterStateMachineCodeTemplate, getFlutterViewCodeTemplate } from "../code_generator_templates/flutter/flutter_presentation_layer_template";
import { FlutterFeatureType } from "../utils/enums";
import { writeDataToFile } from "../utils/writeDataToFile";

export const generateFlutterCode = (
    featureClassName: string,
	snakeCaseFeatureName: string,
	targetDirectory: string,
	type: FlutterFeatureType,
): void => {
    const targetPath = `${targetDirectory}/${snakeCaseFeatureName}`
	if (type == FlutterFeatureType.full) {
		generateDataLayerCode(`${targetPath}/data/repository`, featureClassName, snakeCaseFeatureName);
		generateDomainLayerCode(`${targetPath}/domain/repository/`, featureClassName, snakeCaseFeatureName);
		generatePresentationLayerCode(`${targetPath}/presentation`, featureClassName, snakeCaseFeatureName);
	} else {
		generatePresentationLayerCode(targetPath, featureClassName, snakeCaseFeatureName);
	}
}

function generateDataLayerCode(
	targetDirectory: string,
	featureClassName: string,
	snakeCaseFeatureName: string,
) {
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}_repository_impl.dart`,
		getFlutterDataLayerCodeTemplate(featureClassName, snakeCaseFeatureName)
	);
}

function generateDomainLayerCode(
	targetDirectory: string,
	featureClassName: string,
	snakeCaseFeatureName: string,
) {
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}_repository.dart`,
		getFlutterDomainLayerCodeTemplate(featureClassName)
	);
}

function generatePresentationLayerCode(
	targetDirectory: string,
	featureClassName: string,
	snakeCaseFeatureName: string,
) { 
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}_view.dart`,
		getFlutterViewCodeTemplate(featureClassName, snakeCaseFeatureName)
	);
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}_controller.dart`,
		getFlutterControllerCodeTemplate(featureClassName, snakeCaseFeatureName)
	);
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}_presenter.dart`,
		getFlutterPresenterCodeTemplate(featureClassName)
	);
	writeDataToFile(
		targetDirectory,
		`${snakeCaseFeatureName}_state_machine.dart`,
		getFlutterStateMachineCodeTemplate(featureClassName)
	);
}

import { getFlutterDataLayerCodeTemplate } from "../code_generator_templates/flutter/flutter_data_layer_template";
import { getFlutterDomainLayerCodeTemplate } from "../code_generator_templates/flutter/flutter_domain_layer_template";
import {
  getFlutterControllerCodeTemplate,
  getFlutterDeviceViewCodeTemplate,
  getFlutterPresenterCodeTemplate,
  getFlutterStateMachineCodeTemplate,
  getFlutterViewCodeTemplate,
} from "../code_generator_templates/flutter/flutter_presentation_layer_template";
import { DeviceType, FlutterFeatureType, FlutterState } from "../utils/enums";
import { writeDataToFile } from "../utils/writeDataToFile";

export const generateFlutterCode = (
  featureClassName: string,
  snakeCaseFeatureName: string,
  targetDirectory: string,
  type: FlutterFeatureType
): void => {
  const targetPath = `${targetDirectory}/${snakeCaseFeatureName}`;
  if (type == FlutterFeatureType.full) {
    generateDataLayerCode(
      `${targetPath}/data/repository`,
      featureClassName,
      snakeCaseFeatureName
    );
    generateDomainLayerCode(
      `${targetPath}/domain/repository/`,
      featureClassName,
      snakeCaseFeatureName
    );
    generatePresentationLayerCode(
      `${targetPath}/presentation`,
      featureClassName,
      snakeCaseFeatureName
    );
  } else {
    generatePresentationLayerCode(
      targetPath,
      featureClassName,
      snakeCaseFeatureName
    );
  }
};

function generateDataLayerCode(
  targetDirectory: string,
  featureClassName: string,
  snakeCaseFeatureName: string
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
  snakeCaseFeatureName: string
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
  snakeCaseFeatureName: string
) {
  // View
  writeDataToFile(
    targetDirectory,
    `${snakeCaseFeatureName}_view.dart`,
    getFlutterViewCodeTemplate(featureClassName, snakeCaseFeatureName)
  );

  // Controller
  writeDataToFile(
    targetDirectory,
    `${snakeCaseFeatureName}_controller.dart`,
    getFlutterControllerCodeTemplate(featureClassName, snakeCaseFeatureName)
  );

  // Presenter
  writeDataToFile(
    targetDirectory,
    `${snakeCaseFeatureName}_presenter.dart`,
    getFlutterPresenterCodeTemplate(featureClassName)
  );

  // State Machine
  writeDataToFile(
    targetDirectory,
    `${snakeCaseFeatureName}_state_machine.dart`,
    getFlutterStateMachineCodeTemplate(featureClassName)
  );

  // Mobile Views
  for (let state in FlutterState) {
    writeDataToFile(
      `${targetDirectory}/mobile`,
      `${state.toLowerCase()}_view_mobile.dart`,
      getFlutterDeviceViewCodeTemplate(
        FlutterState[state as keyof typeof FlutterState],
        DeviceType.Mobile
      )
    );
  }

  // Desktop Views
  for (let state in FlutterState) {
    writeDataToFile(
      `${targetDirectory}/desktop`,
      `${state.toLowerCase()}_view_web.dart`,
      getFlutterDeviceViewCodeTemplate(
        FlutterState[state as keyof typeof FlutterState],
        DeviceType.Web
      )
    );
  }
}

import { lstatSync } from "fs";
import { Uri, window } from "vscode";
import { promptForTargetDirectory } from "../utils/directoryInputDialog";
import { promptForTextInput } from "../utils/textInputDialog";
import * as _ from "lodash";
import { promptForOptionsInput } from "../utils/optionInputDialog";
import { snakeCase, titleCase } from "../utils/stringOperations";
import { generateTSDirectories } from "./directoriesGenerator";
import { TSFeatureType } from "../utils/enums";
import { generateTSCode } from "./codeGenerator";
import { pascalCase } from "pascal-case";
import { camelCase } from "camel-case";

export const newTSFeatureOrchestrator = async (uri: Uri) => {
  // Get feature name
  const featureName = await promptForTextInput(
    "Example Name",
    "student operations"
  );
  if (_.isNil(featureName) || featureName.trim() === "") {
    window.showErrorMessage("The feature name must not be empty");
    return;
  }

  // Get target directory
  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory(
      "Select a folder to create the feature in"
    );
    if (_.isNil(targetDirectory)) {
      window.showErrorMessage("Please select a valid directory");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  //Feature type [full, presentation]
  const rawFeatureType: string | undefined = await promptForOptionsInput(
    [TSFeatureType.NEW_OPERATION, TSFeatureType.EXISTING_OPERATION],
    "Select a feature type"
  );

  if (rawFeatureType == undefined) {
    window.showErrorMessage("The feature type must be selected");
    return;
  }

  const featureType: TSFeatureType =
    TSFeatureType[rawFeatureType as keyof typeof TSFeatureType];

  const featureClassName = pascalCase(featureName);
  const snakeCaseFeatureName = camelCase(featureName);

  try {
    await generateTSDirectories(
      snakeCaseFeatureName,
      targetDirectory,
      featureType
    );

    generateTSCode(
      featureClassName,
      snakeCaseFeatureName,
      targetDirectory,
      featureType
    );

    window.showInformationMessage(
      `Successfully Generated ${featureName} feature`
    );
  } catch (error) {
    window.showInformationMessage(
      `Error:
				${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

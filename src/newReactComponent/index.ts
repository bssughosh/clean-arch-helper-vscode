import { lstatSync } from "fs";
import { Uri, window } from "vscode";
import { promptForTargetDirectory } from "../utils/directoryInputDialog";
import { promptForTextInput } from "../utils/textInputDialog";
import * as _ from "lodash";
import { pascalCase } from "pascal-case";
import { generateReactDirectories } from "./directoriesGenerator";
import { generateReactComponentCode } from "./codeGenerator";

export const newReactComponentOrchestrator = async (uri: Uri) => {
  const featureName = await promptForTextInput("Example Name", "Button");
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

  const featureClassName = pascalCase(featureName);

  try {
    await generateReactDirectories(featureClassName, targetDirectory);

    generateReactComponentCode(featureClassName, targetDirectory);

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

import { lstatSync } from "fs";
import { Uri, window } from "vscode";
import { promptForTargetDirectory } from "../utils/directoryInputDialog";
import { promptForTextInput } from "../utils/textInputDialog";
import * as _ from "lodash";
import { promptForOptionsInput } from "../utils/optionInputDialog";
import { FeatureType } from "../utils/enums";
import { snakeCase, titleCase } from "../utils/stringOperations";
import { generateFlutterCode } from "./codeGenerator";
import { generateFlutterDirectories } from "./directoriesGenerator";

export const newFlutterFeatureOrchestrator = async (uri: Uri) => {
    // Get feature name
    const featureName = await promptForTextInput("Name", "counter");
    if (_.isNil(featureName) || featureName.trim() === "") {
        window.showErrorMessage("The feature name must not be empty");
        return;
    }

    // Get target directory
    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await promptForTargetDirectory("Select a folder to create the feature in");
        if (_.isNil(targetDirectory)) {
            window.showErrorMessage("Please select a valid directory");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    // Feature type [full, presentation]
    const rawFeatureType: string | undefined = await promptForOptionsInput([FeatureType.full, FeatureType.presentation], "Select a feature type");

    if (rawFeatureType == undefined) {
        window.showErrorMessage("The feature type must be selected");
        return;
    }

    const featureType: FeatureType = FeatureType[rawFeatureType as keyof typeof FeatureType]

    const featureClassName = titleCase(featureName)
    const snakeCaseFeatureName = snakeCase(featureName);

    try {
        await generateFlutterDirectories(snakeCaseFeatureName, targetDirectory, featureType);
        generateFlutterCode(featureClassName, snakeCaseFeatureName, targetDirectory, featureType);
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
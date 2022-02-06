import { getReactJSXCodeTemplate } from "../code_generator_templates/react/react_jsx_code_template";
import { writeDataToFile } from "../utils/writeDataToFile";

export const generateReactComponentCode = (
  featureName: string,
  targetDirectory: string
): void => {
  generateJSXCode(targetDirectory, featureName);

  generateSCSSCode(targetDirectory, featureName);
};

function generateJSXCode(targetDirectory: string, featureName: string) {
  writeDataToFile(
    targetDirectory,
    `${featureName}.jsx`,
    getReactJSXCodeTemplate(featureName)
  );
}

function generateSCSSCode(targetDirectory: string, featureClassName: string) {
  writeDataToFile(targetDirectory, `${featureClassName}.module.scss`, "");
}

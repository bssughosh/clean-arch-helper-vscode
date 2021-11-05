import { OpenDialogOptions, window } from "vscode";
import * as _ from "lodash";

export const promptForTargetDirectory = async (label: string): Promise<string | undefined> => {
	const options: OpenDialogOptions = {
		canSelectMany: false,
		openLabel: label,
		canSelectFolders: true,
	};

	return window.showOpenDialog(options).then((uri) => {
		if (_.isNil(uri) || _.isEmpty(uri)) {
			return undefined;
		}
		return uri[0].fsPath;
	});
}
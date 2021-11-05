import { window } from "vscode";

export const promptForOptionsInput = async (values: Array<string>, placeHolder: string): Promise<string | undefined> => {
	const featureType = await window.showQuickPick([...values].map(label => ({ label })), {
		placeHolder: placeHolder,
	});

	return featureType?.label;
}


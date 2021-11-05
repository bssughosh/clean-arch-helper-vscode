import { InputBoxOptions, window } from "vscode";

export const promptForTextInput = (promptName: string, placeHolder: string): Thenable<string | undefined> => {
	const namePromptOptions: InputBoxOptions = {
		prompt: promptName,
		placeHolder: placeHolder,
	};
	return window.showInputBox(namePromptOptions);
}
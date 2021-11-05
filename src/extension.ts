
import * as vscode from 'vscode';
import { newFlutterFeatureOrchestrator } from './newFlutterFeature/newFlutterFeatureOrchestartor';


export function activate(context: vscode.ExtensionContext) {
	let newFlutterFeature = vscode.commands.registerCommand('clean-arch-helper.newFlutterFeature', newFlutterFeatureOrchestrator);

	context.subscriptions.push(newFlutterFeature);
}

// this method is called when your extension is deactivated
export function deactivate() {}


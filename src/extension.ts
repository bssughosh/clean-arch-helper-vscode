import * as vscode from "vscode";
import { newFlutterFeatureOrchestrator } from "./newFlutterFeature/newFlutterFeatureOrchestartor";
import { newReactComponentOrchestrator } from "./newReactComponent";
import { newTSFeatureOrchestrator } from "./newTSFeature/newTSFeatureOrchestrator";

export function activate(context: vscode.ExtensionContext) {
  let newFlutterFeature = vscode.commands.registerCommand(
    "clean-arch-helper.newFlutterFeature",
    newFlutterFeatureOrchestrator
  );

  let newTSFeature = vscode.commands.registerCommand(
    "clean-arch-helper.newTSFeature",
    newTSFeatureOrchestrator
  );

  let newReactComponent = vscode.commands.registerCommand(
    "clean-arch-helper.newReactComponent",
    newReactComponentOrchestrator
  );

  context.subscriptions.push(
    newFlutterFeature,
    newTSFeature,
    newReactComponent
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

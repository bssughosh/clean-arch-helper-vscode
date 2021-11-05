# clean-arch-helper README

An extension (for VSCODE) to help generate the minimal code to be used while implementing clean architecture.


## How to setup

1. Clone this repository in extensions folder in .vscode directory (Usually in $HOME/.vscode/extenstions)
2. Inside this directory run
```bash
npm install
npm run compile
```
3. Reload the window (vscode) to see the changes in the extensions and then the extension should work.

## Features

1. newFlutterFeature (CAH: New Flutter Clean Architecture)
    - Enter a feature name
    - Select a target directory where the feature is required
    - Select type of feature
        - full: All 3 layers, i.e., data, domain and presentation folders and code are generated
        - presenation: Only the presentation folder with the required code is generated


## Release Notes

### 1.0.0

- Initial release 
- Added functionality to add new flutter clean architecture feature

-----------------------------------------------------------------------------------------------------------

## Extension documentation

A detailed documention for creating vscode extensions can be obtained from [here](https://code.visualstudio.com/api/extension-guides/overview)


**Enjoy!**

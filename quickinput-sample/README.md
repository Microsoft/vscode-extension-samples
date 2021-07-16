# QuickInput Sample

This is a sample extension that shows the QuickInput UI and usage of the QuickInput API.

It is not intended as a production quality extension.

- Open the command palette
- Run "Quick Input Samples"
- Pick one of the samples and see it run

## Demo

![Multi-step sample](https://raw.githubusercontent.com/Microsoft/vscode-extension-samples/main/quickinput-sample/preview.gif)

## How it works

- The extension uses the [`QuickPick`](https://code.visualstudio.com/api/references/vscode-api#QuickPick) and [`InputBox`](https://code.visualstudio.com/api/references/vscode-api#InputBox) API to show a UI for user input.
- Registers a command via `package.json` that will trigger the quick input

## VS Code API

### `vscode` module

- [`QuickPick`](https://code.visualstudio.com/api/references/vscode-api#QuickPick)
- [`InputBox`](https://code.visualstudio.com/api/references/vscode-api#InputBox)
- [`window.createQuickPick`](https://code.visualstudio.com/api/references/vscode-api#window.createQuickPick)
- [`window.showQuickPick`](https://code.visualstudio.com/api/references/vscode-api#window.showQuickPick)
- [`window.createInputBox`](https://code.visualstudio.com/api/references/vscode-api#window.createInputBox)
- [`window.showInputBox`](https://code.visualstudio.com/api/references/vscode-api#window.showInputBox)

# How to run locally

- Run `npm install` in terminal to install dependencies
- Run `npm run compile` in terminal to do an initial compile
- Run the `Run Extension` target in the Debug View. This will:
	- Start a task `npm: watch` to compile the code
	- Run the extension in a new VS Code window

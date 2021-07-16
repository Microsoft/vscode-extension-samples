import * as vscode from 'vscode';
import * as Chance from 'chance';

export function activate(context: vscode.ExtensionContext) {

	// random animal locations
	const types = [ 'Ocean', 'Desert', 'Grassland', 'Forest', 'Farm', 'Pet', 'Zoo' ];

	// Command: Insert Random Word
	let insertRandom = vscode.commands.registerCommand('extension.insertRandom', async () => {

		// Clears all notifications.
		await vscode.commands.executeCommand('notifications.clearAll');
		const chance = new Chance();

		const randomInt = chance.integer({ min: 0, max: 6 });
		const randomType = types[randomInt];
		// Random animal
		const randomAnimal = chance.animal({ type: randomType }) + '\n';

		// Active text editor instance.
		const editor = vscode.window.activeTextEditor;

		// Return if there are no active editors.
		if (!editor) return;

		// Edit active text editor
		editor.edit((active) => {

			// Line 1 position
			const position = new vscode.Position(0, 0);

			// Insert randomAnimal in line 1.
			active.insert(position, randomAnimal);
		}).then(() => {
			
			// Pop animal location in notifications.
			vscode.window.showInformationMessage(`Location: ${randomType}`);
		});
	});

	// Command: Insert Random Word in Selected Line
	let insertRandomSelection = vscode.commands.registerCommand('extension.insertRandomSelection', async () => {

		// Clears all notifications.
		await vscode.commands.executeCommand('notifications.clearAll');
		const chance = new Chance();

		const randomInt = chance.integer({ min: 0, max: 6 });
		const randomType = types[randomInt];
		// Random animal
		const randomAnimal = chance.animal({ type: randomType }) + '\n';
		// Active text editor instance.
		const editor = vscode.window.activeTextEditor;

		// Return if there are no active editors.
		if (!editor) return;

		// Edit active text editor
		editor.edit((active) => {

			// Position of selected line.
			const selection = editor.selection.anchor;

			// Insert randomAnimal in selected line.
			active.insert(selection, randomAnimal);

		}).then(() => {
			
			// Pop animal location in notifications.
			vscode.window.showInformationMessage(`Location: ${randomType}`);
		});
	});

	// Command: Delete Random Word
	let deleteRandom = vscode.commands.registerCommand('extension.deleteRandom', async () => {

		// Clears all notifications.
		await vscode.commands.executeCommand('notifications.clearAll');
		// Active text editor instance.
		const editor = vscode.window.activeTextEditor;

		// Return if there are no active editors.
		if (!editor) return;

		// Edit active text editor
		editor.edit((active) => {

			// Line 0
			const start = new vscode.Position(0, 0);
			// Line 1
			const end = new vscode.Position(1, 0);
			// Line 1 position
			const range = new vscode.Range(start, end);

			// Delete text in line 1.
			active.delete(range);
		}).then(() => {
			
			// Notification
			vscode.window.showInformationMessage(`Successfully removed text in line 1.`);
		});
	});

	// Command: Delete Selected Text
	let deleteSelection = vscode.commands.registerCommand('extension.deleteSelection', async () => {

		// Clears all notifications.
		await vscode.commands.executeCommand('notifications.clearAll');
		// Active text editor instance.
		const editor = vscode.window.activeTextEditor;

		// Return if there are no active editors.
		if (!editor) return;

		// Edit active text editor
		editor.edit((active) => {

			// Selected text.
			const selection = editor.selection;

			// Delete selected text
			active.delete(selection);
		}).then(() => {
			
			// Notification
			vscode.window.showInformationMessage(`Successfully removed selected text.`);
		});
	});

	// Command: Delete Text in Selected Line
	let deleteSelectionLine = vscode.commands.registerCommand('extension.deleteSelectionLine', async () => {

		// Clears all notifications.
		await vscode.commands.executeCommand('notifications.clearAll');
		// Active text editor instance.
		const editor = vscode.window.activeTextEditor;

		// Return if there are no active editors.
		if (!editor) return;

		// Edit active text editor
		editor.edit((active) => {

			// Line number of selected line
			const startLine = editor.selection.start.line;
			const endLine = startLine + 1;

			const start = new vscode.Position(startLine, 0);
			const end = new vscode.Position(endLine, 0);
			// Position of selected line
			const range = new vscode.Range(start, end);

			// Delete text in selected line
			active.delete(range);
		}).then(() => {
			
			// Notification
			vscode.window.showInformationMessage(`Successfully removed text in selected line.`);
		});
	});

	// dispose
	context.subscriptions.push(insertRandom, insertRandomSelection, deleteRandom, deleteSelection, deleteSelectionLine);
}

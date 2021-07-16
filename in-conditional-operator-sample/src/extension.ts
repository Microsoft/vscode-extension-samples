'use strict';

import { workspace, ExtensionContext } from 'vscode';
import { registerCommands } from './commands';
import { updateContexts } from './contexts';

export async function activate(context: ExtensionContext): Promise<void> {
	registerCommands(context.subscriptions);

	const watchPattern = `**/package.json`;
	const ignorePattern = '**/node_modules/**/package.json';

	// "Scan" initial custom contexts state
	const pkgJsonFiles = await workspace.findFiles(watchPattern, ignorePattern);
	pkgJsonFiles.forEach(updateContexts);

	// Handle changes to the custom contexts state
	const pkgJsonWatcher = workspace.createFileSystemWatcher(watchPattern);
	pkgJsonWatcher.onDidChange(updateContexts);
	pkgJsonWatcher.onDidCreate(updateContexts);
	pkgJsonWatcher.onDidDelete(updateContexts);
}

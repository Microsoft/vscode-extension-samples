/*
 * This file is responsible for managing the state of our custom VSCode contexts
 * To enable the `in` operator to correctly evaluate.
 */

import { Uri, commands, workspace } from 'vscode';
import { isPlainObject, isString, isEmpty } from 'lodash';

// We manage a duplicate of the context state in our extension
// to support deletion and changes as the `vscode.commands.executeCommand('setContext', ...)`
// command only supports a full "override" of the context value.
const pkgJsonWithDependenciesContext = Object.create(null);
const pkgJsonWithTestScriptContext = Object.create(null);

export async function updateContexts(uri: Uri) {
	// cleanup the context path (may be a NOOP)
	delete pkgJsonWithDependenciesContext[uri.fsPath];
	delete pkgJsonWithTestScriptContext[uri.fsPath];

	try {
		// read the watched package.json file contents
		const readData = await workspace.fs.readFile(uri);
		const readStr = Buffer.from(readData).toString('utf8');
		const pkgJson = JSON.parse(readStr);

		// update our "duplicate" contexts information where applicable
		if (isString(pkgJson?.scripts?.test)) {
			pkgJsonWithTestScriptContext[uri.fsPath] = true;
		}
		if (
			(isPlainObject(pkgJson.dependencies) && !isEmpty(pkgJson.dependencies)) ||
			(isPlainObject(pkgJson.devDependencies) && !isEmpty(pkgJson.devDependencies))
		) {
			pkgJsonWithDependenciesContext[uri.fsPath] = true;
		}
	} catch (e) {
		// a syntactically invalid package.json file --> ignore it
	}

	commands.executeCommand(
		'setContext',
		'ext:pkgJsonWithTestScript',
		pkgJsonWithTestScriptContext
	);
	commands.executeCommand(
		'setContext',
		'ext:pkgJsonWithDependencies',
		pkgJsonWithDependenciesContext
	);
}

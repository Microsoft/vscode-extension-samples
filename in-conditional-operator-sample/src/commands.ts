/*
 * This file is responsible for registering and executing the
 * `Install Dependencies` and `Run Tests` commands.
 */

import { dirname } from 'path';
import {
	commands,
	ExtensionContext,
	ShellExecution,
	Task,
	TaskDefinition,
	tasks,
	Uri,
} from 'vscode';

export function registerCommands(subscriptions: ExtensionContext['subscriptions']) {
	const npmInstallDisposable = commands.registerCommand(
		'extension.installDependencies',
		installDependenciesCommand
	);
	subscriptions.push(npmInstallDisposable);

	const npmRunDisposable = commands.registerCommand('extension.runTests', runTestsCommand);
	subscriptions.push(npmRunDisposable);
}

function installDependenciesCommand(pkgJsonUri: Uri): void {
	const installDepsTaskDef: TaskDefinition = {
		label: 'Install Dependencies',
		type: 'shell',
		command: 'npm',
	};

	// note the `cwd` is computed **dynamically**
	// according to the **specific** package.json location.
	const cwd = dirname(pkgJsonUri.fsPath);
	const installDepsTask: Task = new Task(
		installDepsTaskDef,
		'Install Dependencies',
		'npm',
		new ShellExecution('npm install', { cwd })
	);
	tasks.executeTask(installDepsTask);
}

function runTestsCommand(pkgJsonUri: Uri): void {
	const runTestsTaskDef: TaskDefinition = {
		label: 'Run Tests',
		type: 'shell',
		command: 'npm',
	};

	// note the `cwd` is computed **dynamically**
	// according to the **specific** package.json location.
	const cwd = dirname(pkgJsonUri.fsPath);
	const runTestsTask: Task = new Task(
		runTestsTaskDef,
		'Run Tests',
		'npm',
		new ShellExecution('npm test', { cwd })
	);
	tasks.executeTask(runTestsTask);
}

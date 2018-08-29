import * as fs from 'fs';
import { window, Disposable } from 'vscode';
import { QuickPickItem } from 'vscode';
import * as _ from 'lodash';

export const historyPath = `${process.env.HOME}/.vscode-cmd-history`;

/**
 * A command prompt with history
 * 
 */
export async function promptCommand() {
	const command = await pickCommand();
	if (command) {
		window.showInformationMessage(`You picked the following command: '${command}'`)
	}
}

class CommandItem implements QuickPickItem {
	public label: string;
	public description?: string;
	constructor(label: string, description?: string) {
		this.label = label;
		this.description = description;
	}
}
class HistoryItem extends CommandItem {
	constructor(label: string, description?: string) {
		super(label, description);
	}
}
class InputItem extends CommandItem {
	constructor(public label: string) {
		super(label, '(current input)');
	};
}

async function pickCommand() {
	const disposables: Disposable[] = [];
	let commandsItems: CommandItem[] = [];
	let currentValue: string | undefined = undefined;
	let historyShouldBeUpdated = false;

	try {
		return await new Promise<string | undefined>((resolve, reject) => {
			const input = window.createQuickPick<CommandItem>();
			input.placeholder = 'Type a command';
			input.items = commandsItems;

			const updateQuickPick = (value?: string): void => {
				if (!value) {
					input.items = commandsItems;
					return;
				}
				input.items = [
					new InputItem(value)
				].concat(
					commandsItems
				)
				// §todo: add autocomplete suggestions
			}

			disposables.push(
				input.onDidChangeValue((value?: string) => {
					currentValue = value;
					updateQuickPick(value);
				}),
				input.onDidChangeSelection((items: CommandItem[]) => {
					const item = items[0];
					if (item instanceof HistoryItem) {
						resolve(item.label);
						input.hide();
						// do not record new input in history
					} else if (item instanceof InputItem) {
						resolve(item.label);
						input.hide();
						// record new input in history
						if (historyShouldBeUpdated && !item.label.startsWith(' ')) {
							fs.appendFile(historyPath, item.label + '\n', function (err) {
								if (err) console.error('Problem while updating history file', err);
							});
						}
					}
				}),
				input.onDidHide(() => {
					resolve(undefined);
					input.dispose();
				})
			);
			input.show();

			if (fs.existsSync(historyPath)) {
				fs.readFile(historyPath, (err, content) => {
					if (err) {
						console.error('Could not load file history', err);
					}
					historyShouldBeUpdated = true;
					const commands = content.toString().trimRight().split('\n').reverse();
					commandsItems = _.map(commands, (cmd: string, index: number) => new HistoryItem(cmd, `(history item ${index})`));
					updateQuickPick(currentValue);
				});
			} else {
				console.log('history file does not exist yet');
				historyShouldBeUpdated = true;
			}

		});
	} finally {
		disposables.forEach(d => d.dispose());
	}
}

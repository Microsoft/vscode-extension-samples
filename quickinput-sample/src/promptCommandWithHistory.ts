import { window, Disposable, Memento } from 'vscode';
import { QuickPickItem } from 'vscode';

const HISTORY_KEY = 'HISTORY_KEY';


/**
 * A command prompt with history
 *
 */
export const getPromptCommand = (memo: Memento) => {
    const pickCommand = getPickCommand(memo);
    // §TODO: cache promptCommand!
    return async function promptCommand() {
        const command = await pickCommand();
        if (command) {
            window.showInformationMessage(`You picked the following command: '${command}'`);
        }
    };
};

class CommandItem implements QuickPickItem {
    public static HISTORY: string = 'history';
    public static INPUT: string = 'input';

    public label: string;
    public description?: string;
    public type: string;

    constructor(type: string, label: string, description?: string) {
        this.type = type;
        this.label = label;
        this.description = description;
    }

    static input(content: string): CommandItem {
        return new CommandItem(CommandItem.INPUT, content, '(current input)');
    }
    static history(content: string, description?: string): CommandItem {
        return new CommandItem(CommandItem.HISTORY, content, description);
    }
}

const getPickCommand = (memo: Memento) => async function pickCommand() {
    const disposables: Disposable[] = [];
    try {
        return await new Promise<string | undefined>((resolve, reject) => {
            const input = window.createQuickPick<CommandItem>();
            input.placeholder = 'Type a command';
            input.items = [];
            const historyItems: CommandItem[] = memo.get(HISTORY_KEY, []).map(
                (cmd: string, index: number) => CommandItem.history(cmd, `(history item ${index})`)
            );
            input.items = historyItems;

            const updateQuickPick = (value?: string): void => {
                input.items = value
                    ? [CommandItem.input(value)].concat(historyItems)
                    : historyItems;
                // §todo: add autocomplete suggestions
            };

            disposables.push(
                input.onDidChangeValue(updateQuickPick),
                input.onDidChangeSelection((items: CommandItem[]) => {
                    const item = items[0];
                    if (item.type === CommandItem.HISTORY) {
                        resolve(item.label);
                        input.hide();
                        // do not record new input in history
                        // §todo : maybe reorder
                    } else if (item.type === CommandItem.INPUT) {
                        resolve(item.label);
                        input.hide();
                        // record new input in history
                        if (!item.label.startsWith(' ')) {
                            const currentHistory: string[] = memo.get(HISTORY_KEY, []);
                            currentHistory.unshift(item.label);
                            memo.update(HISTORY_KEY, currentHistory);
                        }
                    }
                }),
                input.onDidHide(() => {
                    resolve(undefined);
                    input.dispose();
                })
            );
            input.show();
        });
    } finally {
        disposables.forEach(d => d.dispose());
    }
};

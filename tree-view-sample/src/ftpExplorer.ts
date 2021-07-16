import * as vscode from 'vscode';
import * as Client from 'ftp';
import { basename, dirname, join } from 'path';

interface IEntry {
	name: string;
	type: string;
}

export interface FtpNode {

	resource: vscode.Uri;
	isDirectory: boolean;

}

export class FtpModel {
	constructor(readonly host: string, private user: string, private password: string) {
	}

	public connect(): Thenable<Client> {
		return new Promise((c, e) => {
			const client = new Client();
			client.on('ready', () => {
				c(client);
			});

			client.on('error', error => {
				e('Error while connecting: ' + error.message);
			});

			client.connect({
				host: this.host,
				username: this.user,
				password: this.password
			});
		});
	}

	public get roots(): Thenable<FtpNode[]> {
		return this.connect().then(client => {
			return new Promise((c, e) => {
				client.list((err, list) => {
					if (err) {
						return e(err);
					}

					client.end();

					return c(this.sort(list.map(entry => ({ resource: vscode.Uri.parse(`ftp://${this.host}///${entry.name}`), isDirectory: entry.type === 'd' }))));
				});
			});
		});
	}

	public getChildren(node: FtpNode): Thenable<FtpNode[]> {
		return this.connect().then(client => {
			return new Promise((c, e) => {
				client.list(node.resource.fsPath, (err, list) => {
					if (err) {
						return e(err);
					}

					client.end();

					return c(this.sort(list.map(entry => ({ resource: vscode.Uri.parse(`${node.resource.fsPath}/${entry.name}`), isDirectory: entry.type === 'd' }))));
				});
			});
		});
	}

	private sort(nodes: FtpNode[]): FtpNode[] {
		return nodes.sort((n1, n2) => {
			if (n1.isDirectory && !n2.isDirectory) {
				return -1;
			}

			if (!n1.isDirectory && n2.isDirectory) {
				return 1;
			}

			return basename(n1.resource.fsPath).localeCompare(basename(n2.resource.fsPath));
		});
	}

	public getContent(resource: vscode.Uri): Thenable<string> {
		return this.connect().then(client => {
			return new Promise((c, e) => {
				client.get(resource.path.substr(2), (err, stream) => {
					if (err) {
						return e(err);
					}

					let string = '';
					stream.on('data', function (buffer) {
						if (buffer) {
							const part = buffer.toString();
							string += part;
						}
					});

					stream.on('end', function () {
						client.end();
						c(string);
					});
				});
			});
		});
	}
}

export class FtpTreeDataProvider implements vscode.TreeDataProvider<FtpNode>, vscode.TextDocumentContentProvider {

	private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

	constructor(private readonly model: FtpModel) { }

	public refresh(): any {
		this._onDidChangeTreeData.fire(undefined);
	}


	public getTreeItem(element: FtpNode): vscode.TreeItem {
		return {
			resourceUri: element.resource,
			collapsibleState: element.isDirectory ? vscode.TreeItemCollapsibleState.Collapsed : void 0,
			command: element.isDirectory ? void 0 : {
				command: 'ftpExplorer.openFtpResource',
				arguments: [element.resource],
				title: 'Open FTP Resource'
			}
		};
	}

	public getChildren(element?: FtpNode): FtpNode[] | Thenable<FtpNode[]> {
		return element ? this.model.getChildren(element) : this.model.roots;
	}

	public getParent(element: FtpNode): FtpNode {
		const parent = element.resource.with({ path: dirname(element.resource.path) });
		return parent.path !== '//' ? { resource: parent, isDirectory: true } : null;
	}

	public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
		return this.model.getContent(uri).then(content => content);
	}
}

export class FtpExplorer {

	private ftpViewer: vscode.TreeView<FtpNode>;

	constructor(context: vscode.ExtensionContext) {
		/* Please note that login information is hardcoded only for this example purpose and recommended not to do it in general. */
		const ftpModel = new FtpModel('ftp.ngdc.noaa.gov', 'anonymous', 'anonymous');
		const treeDataProvider = new FtpTreeDataProvider(ftpModel);
		context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('ftp', treeDataProvider));

		this.ftpViewer = vscode.window.createTreeView('ftpExplorer', { treeDataProvider });

		vscode.commands.registerCommand('ftpExplorer.refresh', () => treeDataProvider.refresh());
		vscode.commands.registerCommand('ftpExplorer.openFtpResource', resource => this.openResource(resource));
		vscode.commands.registerCommand('ftpExplorer.revealResource', () => this.reveal());
	}

	private openResource(resource: vscode.Uri): void {
		vscode.window.showTextDocument(resource);
	}

	private reveal(): Thenable<void> {
		const node = this.getNode();
		if (node) {
			return this.ftpViewer.reveal(node);
		}
		return null;
	}

	private getNode(): FtpNode {
		if (vscode.window.activeTextEditor) {
			if (vscode.window.activeTextEditor.document.uri.scheme === 'ftp') {
				return { resource: vscode.window.activeTextEditor.document.uri, isDirectory: false };
			}
		}
		return null;
	}
}
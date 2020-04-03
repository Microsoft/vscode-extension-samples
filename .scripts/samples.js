//@ts-check

/**
 * @typedef {Object} Sample
 * @property {string} description - A readable name for the sample
 * @property {string} path - Path to the sample's root
 * @property {string | null} guide - Link to the guide on https://code.visualstudio.com
 * @property {string[]} apis - Listing of VS Code API that is being illustrated. For example, "TextDocumentContentProvider"
 * @property {string[]} contributions - Listing of Contribution Points that are being used. For example,
 */

/** @type {Sample[]} */
const samples = [
	{
		description: 'Webview Sample',
		path: 'webview-sample',
		guide: '/api/extension-guides/webview',
		apis: ['window.createWebviewPanel', 'window.registerWebviewPanelSerializer'],
		contributions: []
	},
	{
		description: 'Status Bar Sample',
		path: 'statusbar-sample',
		guide: null,
		apis: ['window.createStatusBarItem', 'StatusBarItem'],
		contributions: []
	},
	{
		description: 'Tree View Sample',
		path: 'tree-view-sample',
		guide: '/api/extension-guides/tree-view',
		apis: [
			'window.createTreeView',
			'window.registerTreeDataProvider',
			'TreeView',
			'TreeDataProvider'
		],
		contributions: ['views', 'viewsContainers']
	},
	{
		description: 'Task Provider Sample',
		path: 'task-provider-sample',
		guide: '/api/extension-guides/task-provider',
		apis: ['tasks.registerTaskProvider', 'Task', 'ShellExecution'],
		contributions: ['taskDefinitions']
	},
	{
		description: 'Multi Root Sample',
		path: 'basic-multi-root-sample',
		guide: null,
		apis: ['workspace.getWorkspaceFolder', 'workspace.onDidChangeWorkspaceFolders'],
		contributions: []
	},
	{
		description: 'Completion Provider Sample',
		path: 'completions-sample',
		guide: null,
		apis: ['languages.registerCompletionItemProvider', 'CompletionItem', 'SnippetString'],
		contributions: []
	},
	{
		description: 'Code Actions Sample',
		path: 'code-actions-sample',
		guide: null,
		apis: ['languages.registerCodeActionsProvider', 'CodeActionProvider'],
		contributions: []
	},
	{
		description: 'File System Provider Sample',
		path: 'fsprovider-sample',
		guide: null,
		apis: ['workspace.registerFileSystemProvider'],
		contributions: []
	},
	// { description: 'configuration-sample', path: 'configuration-sample', guide: null, apis: [], contributions: [] },
	// { description: 'contentprovider-sample', path: 'contentprovider-sample', guide: null, apis: [], contributions: [] },
	{
		description: 'Editor Decoractor Sample',
		path: 'decorator-sample',
		guide: null,
		apis: [
			'TextEditor.setDecorations',
			'DecorationOptions',
			'DecorationInstanceRenderOptions',
			'ThemableDecorationInstanceRenderOptions',
			'window.createTextEditorDecorationType',
			'TextEditorDecorationType'
		],
		contributions: ['colors']
	},
	// { description: 'extension-deps-sample', path: 'extension-deps-sample', guide: null, apis: [], contributions: [] },
	{
		description: 'I18n Sample',
		path: 'i18n-sample',
		guide: null,
		apis: [],
		contributions: []
	},
	// { description: 'multi-diagnostics-sample', path: 'multi-diagnostics-sample', guide: null, apis: [], contributions: [] },
	// { description: 'nodefs-provider-sample', path: 'nodefs-provider-sample', guide: null, apis: [], contributions: [] },
	// { description: 'progress-sample', path: 'progress-sample', guide: null, apis: [], contributions: [] },
	// { description: 'quickinput-sample', path: 'quickinput-sample', guide: null, apis: [], contributions: [] },
	// { description: 'smart-template-strings-sample', path: 'smart-template-strings-sample', guide: null, apis: [], contributions: [] },
	{
		description: 'Terminal Sample',
		path: 'terminal-sample',
		guide: null,
		apis: [
			'window.createTerminal',
			'window.onDidChangeActiveTerminal',
			'window.onDidCloseTerminal',
			'window.onDidOpenTerminal',
			'window.Terminal',
			'window.terminals'
		],
		contributions: []
	},
	{
		description: 'Extension Terminal Sample',
		path: 'extension-terminal-sample',
		guide: null,
		apis: [
			'window.createTerminal',
			'window.Pseudoterminal',
			'window.ExtensionTerminalOptions'
		],
		contributions: []
	},
	// { description: 'theme-sample', path: 'theme-sample', guide: null, apis: [], contributions: [] },
	{
		description: 'Vim Sample',
		path: 'vim-sample',
		guide: null,
		apis: [
			`commands`,
			`StatusBarItem`,
			`window.createStatusBarItem`,
			`TextEditorCursorStyle`,
			`window.activeTextEditor`,
			`Position`,
			`Range`,
			`Selection`,
			`TextEditor`,
			`TextEditorRevealType`,
			`TextDocument`
		],
		contributions: []
	},
	// { description: 'webpack-sample', path: 'webpack-sample', guide: null, apis: [], contributions: [] },
	{
		description: 'Source Control Sample',
		path: 'source-control-sample',
		guide: '/api/extension-guides/scm-provider',
		apis: [
			'workspace.workspaceFolders',
			'SourceControl',
			'SourceControlResourceGroup',
			'scm.createSourceControl',
			'TextDocumentContentProvider'
		],
		contributions: ['menus']
	},
	{
		description: 'Commenting API Sample',
		path: 'comment-sample',
		guide: null,
		apis: [],
		contributions: []
	},
	{
		description: 'Document Editing Sample',
		path: 'document-editing-sample',
		guide: null,
		apis: [`commands`],
		contributions: []
	},
	{
		description: 'Custom Data Sample',
		path: 'custom-data-sample',
		guide: '/api/extension-guides/custom-data-extension',
		apis: [],
		contributions: []
	},
	{
		description: 'CodeLens Provider Sample',
		path: 'codelens-sample',
		guide: null,
		apis: [`languages.registerCodeLensProvider`, `CodeLensProvider`, `CodeLens`],
		contributions: []
	},
	{
		description: 'Call Hierarchy Sample',
		path: 'call-hierarchy-sample',
		guide: null,
		apis: [
			`languages.registerCallHierarchyProvider`,
			`CallHierarchyProvider`,
			`CallHierarchyItem`,
			`CallHierarchyOutgoingCall`,
			`CallHierarchyIncomingCall`
		],
		contributions: []
	},
	{
		description: 'Hello World Jest Test Sample',
		path: 'helloworld-jest-test-sample',
		guide: '/api/working-with-extensions/testing-extension#jest',
		apis: [],
		contributions: []
	}
];

/** LSP specific samples */
/** @type {Sample[]} */
const lspSamples = [
	{
		description: 'Snippet Sample',
		path: 'snippet-sample',
		guide: '/api/language-extensions/snippet-guide',
		apis: [],
		contributions: ['snippets']
	},
	{
		description: 'Language Configuration Sample',
		path: 'language-configuration-sample',
		guide: '/api/language-extensions/language-configuration-guide',
		apis: [],
		contributions: ['languages']
	},
	{
		description: 'LSP Sample',
		path: 'lsp-sample',
		guide: '/api/language-extensions/language-server-extension-guide',
		apis: [],
		contributions: []
	},
	{
		description: 'LSP Log Streaming Sample',
		path: 'lsp-log-streaming-sample',
		guide: null,
		apis: [],
		contributions: []
	},
	{
		description: 'LSP Multi Root Server Sample',
		path: 'lsp-multi-server-sample',
		guide:
			'https://github.com/Microsoft/vscode/wiki/Extension-Authoring:-Adopting-Multi-Root-Workspace-APIs#language-client--language-server',
		apis: [],
		contributions: []
	}
];
/**
 * LSP specific samples
 * DO NOT add non-LSP items here. Add it to `samples` list.
 */

module.exports = {
	samples,
	lspSamples
};

//@ts-check

/**
 * @typedef {Object} Sample
 * @property {string} description - A readable name for the sample
 * @property {string} path - Path to the sample's root
 * @property {string | null} guide - Link to the guide on https://code.visualstudio.com
 * @property {string[]} apis - Listing of VS Code API that is being illustrated. For example, "TextDocumentContentProvider"
 * @property {string[]} contributions - Listing of Contribution Points that are being used. For example,
 * @property {boolean} [excludeFromReadme] - Don't generate a readme entry for this extension
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
    description: 'Webview View Sample',
    path: 'webview-view-sample',
    guide: null,
    apis: ['window.registerWebviewViewProvider'],
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
    apis: ['window.createTreeView', 'window.registerTreeDataProvider', 'TreeView', 'TreeDataProvider'],
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
  {
    description: 'Editor Decorator Sample',
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
  {
    description: 'I18n Sample',
    path: 'i18n-sample',
    guide: null,
    apis: [],
    contributions: []
  },
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
  {
    description: 'Color Theme Sample',
    path: 'theme-sample',
    guide: '/api/extension-guides/color-theme',
    apis: [],
    contributions: ['themes']
  },
  {
    description: 'Product Icon Theme Sample',
    path: 'theme-sample',
    guide: '/api/extension-guides/product-icon-theme',
    apis: [],
    contributions: ['productIconThemes']
  },
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
  {
    description: 'webpack-sample',
    path: 'webpack-sample',
    guide: null,
    apis: [],
    contributions: []
  },
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
    contributions: ["menus"]
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
    apis: [
      `commands`
    ],
    contributions: []
  },
  {
    description: 'Document Insert Sample',
    path: 'document-insert-sample',
    guide: null,
    apis: [
      'commands.registerCommand',
      'window.activeTextEditor',
      'TextEditor',
      'TextEditor.edit',
      'TextEditorEdit',
      'TextEditorEdit.insert',
      'TextEditorEdit.replace',
      'TextEditorEdit.delete',
      'Position',
      'Range',
      'Selection',
      'Selection.anchor',
      'Selection.start'
    ],
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
    apis: [`languages.registerCallHierarchyProvider`, `CallHierarchyProvider`, `CallHierarchyItem`, `CallHierarchyOutgoingCall`, `CallHierarchyIncomingCall`],
    contributions: []
  },
  {
    description: 'Custom Editors Sample',
    path: 'custom-editor-sample',
    guide: '/api/extension-guides/custom-editors',
    apis: ['window.registerCustomEditorProvider', 'CustomTextEditorProvider'],
    contributions: ["customEditors"]
  },
  {
    description: 'Semantic tokens',
    path: 'semantic-tokens-sample',
    guide: '/api/language-extensions/semantic-highlight-guide',
    apis: ['languages.registerDocumentSemanticTokensProvider', 'vscode.DocumentSemanticTokensProvider'],
    contributions: []
  },
  { description: 'configuration-sample', excludeFromReadme: true, path: 'configuration-sample', guide: null, apis: [], contributions: [] },
  { description: 'contentprovider-sample', excludeFromReadme: true, path: 'contentprovider-sample', guide: null, apis: [], contributions: [] },
  { description: 'nodefs-provider-sample', excludeFromReadme: true, path: 'nodefs-provider-sample', guide: null, apis: [], contributions: [] },
  { description: 'progress-sample', excludeFromReadme: true, path: 'progress-sample', guide: null, apis: [], contributions: [] },
  { description: 'quickinput-sample', excludeFromReadme: true, path: 'quickinput-sample', guide: null, apis: [], contributions: [] },
  { description: 'diagnostic-related-information-sample', excludeFromReadme: true, path: 'diagnostic-related-information-sample', guide: null, apis: [], contributions: [] },
  { description: 'fsconsumer-sample', excludeFromReadme: true, path: 'fsconsumer-sample', guide: null, apis: [], contributions: [] },
  { description: 'github-authentication-sample', excludeFromReadme: true, path: 'github-authentication-sample', guide: null, apis: [], contributions: [] },

]

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
]
/**
 * LSP specific samples
 * DO NOT add non-LSP items here. Add it to `samples` list.
 */

// eslint-disable-next-line no-undef
module.exports = {
  samples,
  lspSamples
}

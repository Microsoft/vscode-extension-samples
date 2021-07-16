# LSP Webpack Example

A Webpack version of the [LSP Example](../lsp-sample/README.md).

## Structure

```
.
├── src 
│   ├── client // Language Client
│   │   └── extension.ts // Language Client entry point
│   ├── server // Language Server
│   │   └── server.ts // Language Server entry point
│   └── test // End to End tests for Language Client / Server
└── package.json // The extension manifest.
```

## Running the Sample

- Run `npm install` in this folder.
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a document in 'plain text' language mode.
  - Type `j` or `t` to see `Javascript` and `TypeScript` completion.
  - Enter text content such as `AAA aaa BBB`. The extension will emit diagnostics for all words in all-uppercase.

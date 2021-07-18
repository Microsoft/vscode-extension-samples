# I18n Sample

This folder contains a sample VS code extension that shows how to use the package.nls.json and the vscode-nls library for localization. For this sample, it shows two commands: Hello and Bye in English and Japanese.

**Assumptions**

* All localization files are under the i18n folder.
* You could have created this folder by hand, or you could have used the `vscode-nls-dev` tool to extract it.
* Under the i18n folder, you have sub-folders that represent the language you want to localize. These names follow the ISO 639-3 convention.
* Under the language names folder you will create json files that mirror the structure of the source code for your extension (e.g., out/src). The json files are key:value pairs of the text that you want to localize. The naming convention is `<file_name>.i18n.json`.
* If you have a top-level package.nls.json file in your extension, you should have one for each language following the naming convention of `package.i18n.json`.

## Demo

![demo](demo.gif)

## Running the Sample

Localization values are only applied when running the gulp `build` task. During normally development which uses `tsc -watch` to compile no localization post processing happens. This speeds up development time.

1. Ensure that you have `gulp-cli` installed globally using `npm install --global gulp-cli`.
1. Run `npm install` to bring in the dependencies.
1. Follow the steps at https://code.visualstudio.com/api/working-with-extensions/publishing-extension to ensure that you have installed vsce and have a publisher account.
1. Run `gulp package` to produce a .vsix file.
1. Install the .vsix file following the instructions at https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix
1. Change your locale to Japanese by invoking "Configure Language" from the Command Palette.

See the demo.gif file in this repository for a screencast.

## How to translate our extension

VS Code itself uses [Transifex](https://www.transifex.com/) to manage its translations. This might be an option for your extension as well, however none of the nls tooling provided by `vscode-nls` or `vscode-nls-dev` requires Transifex as its translation platform. So you are free to choose a different one.

## What happens behind the scenes

1. The `vscode-nls-dev` module is used to rewrite the generated JavaScript.
1. Calls of the form `localize('some_key', 'Hello')` are transformed to `localize(0, null)` where the first parameter (0, in this example) is the position of the key in your messages file.
1. The contents of the i18n folder are transformed from key:value pairs into positional arrays.

## Considerations

It is possible to use your own localization pipeline.

1. Localizations in your package.json can be done by wrapping the localized text in the form %some.key%.

```
// [Before] package.json

  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello"
      }
    ]

// [After] package.json

  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "%extension.sayHello.title%"
      }
    ]

// [After] new package.nls.json

{
    "extension.sayHello.title": "Hello",
}

```

Then, create the corresponding package.nls.{your_language}.json files for each language to localize.

2. It is also possible to use your own library for localizing text in your source file. You would use the value of `process.env.VSCODE_NLS_CONFIG` environment variable. At runtime, this environment variable is a JSON string that contains the locale that VS Code is run with. For instance, this is the value for Japanese: `"{"locale":"ja","availableLanguages":{"*":"ja"}}"`

```JavaScript

function localize(config) {
  const messages = {
    en: 'Hello',
    ja: 'こんにちは'
  };
  return messages[config['locale']];
}

const config = JSON.parse(process.env.VSCODE_NLS_CONFIG);
localize(config);

```
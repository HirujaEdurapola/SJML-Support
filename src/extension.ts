import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const hoverProvider = vscode.languages.registerHoverProvider('sjml', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            const hoverContent = getHoverContent(word);

            if (hoverContent) {
                return new vscode.Hover(hoverContent);
            }
        }
    });

    context.subscriptions.push(hoverProvider);
}

function getHoverContent(word: string): vscode.MarkdownString | undefined {
    const hoverData: { [key: string]: string } = {
        'sjml': 'The `<sjml>` element represents the root of a SJML document. [Documentation](https://hirujaedurapola.github.io/sjml/support#sjml)',
        'window': '`window` represents the title of the webpage. [Documentation](https://hirujaedurapola.github.io/sjml/support#window)',
        'icon': 'The `icon` property sets the Favicon of the webpage. Using .ico file is strongly recommended while other formats are also accepted. [Documentation](https://hirujaedurapola.github.io/sjml/support#icon)',
        'ver': 'The `ver` property tells the converter about the SJML version used in the current file. Please check the documentation to find the newest version as `!template` might generate a older version of code. [Documentation](https://hirujaedurapola.github.io/sjml/support#version)',
        'dis': 'The `dis` property allows you to render basic texts in SJML. [Documentation](https://hirujaedurapola.github.io/sjml/support#dis)',
        'head': 'The `head` property allows you to render headline texts in SJML. Text is bolded and font size is 34px. [Documentation](https://hirujaedurapola.github.io/sjml/support#head)',
        'break': '`break()` is function in SJML used for inserting line breaks. [Documentation](https://hirujaedurapola.github.io/sjml/support#break)',
        // Add more keywords and descriptions here
    };

    if (hoverData[word]) {
        return new vscode.MarkdownString(hoverData[word]);
    }

    return undefined;
}

export function deactivate() {}
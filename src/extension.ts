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
        '<sjml>': 'The `<sjml>` element represents the root of a SJML document.',
        // Add more keywords and descriptions here
    };

    if (hoverData[word]) {
        return new vscode.MarkdownString(hoverData[word]);
    }

    return undefined;
}

export function deactivate() {}

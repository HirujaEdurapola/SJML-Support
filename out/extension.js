"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
function activate(context) {
    // Hover Provider
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
    // Completion Provider
    const completionProvider = vscode.languages.registerCompletionItemProvider('sjml', {
        provideCompletionItems(document, position, token, context) {
            const completionItems = getCompletionItems();
            return completionItems;
        }
    }, '.');
    // Diagnostics Provider
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('sjml');
    context.subscriptions.push(diagnosticCollection);
    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document.languageId === 'sjml') {
            updateDiagnostics(event.document, diagnosticCollection);
        }
    });
    vscode.workspace.onDidOpenTextDocument(document => {
        if (document.languageId === 'sjml') {
            updateDiagnostics(document, diagnosticCollection);
        }
    });
    context.subscriptions.push(hoverProvider);
    context.subscriptions.push(completionProvider);
}
exports.activate = activate;
function getHoverContent(word) {
    const hoverData = {
        'sjml': 'The `<sjml>` element represents the root of a SJML document. [Documentation](https://hirujaedurapola.github.io/sjml/support#sjml)',
        'window': '`window` represents the title of the webpage. [Documentation](https://hirujaedurapola.github.io/sjml/support#window)',
        'icon': 'The `icon` property sets the Favicon of the webpage. Using .ico file is strongly recommended while other formats are also accepted. [Documentation](https://hirujaedurapola.github.io/sjml/support#icon)',
        'ver': 'The `ver` property tells the converter about the SJML version used in the current file. Please check the documentation to find the newest version as `!template` might generate an older version of code. [Documentation](https://hirujaedurapola.github.io/sjml/support#version)',
        'dis': 'The `dis` property allows you to render basic texts in SJML. [Documentation](https://hirujaedurapola.github.io/sjml/support#dis)',
        'head': 'The `head` property allows you to render headline texts in SJML. Text is bolded and font size is 34px. [Documentation](https://hirujaedurapola.github.io/sjml/support#head)',
        'break': '`break()` is a function in SJML used for inserting line breaks. [Documentation](https://hirujaedurapola.github.io/sjml/support#break)',
        // Add more keywords and descriptions here
    };
    if (hoverData[word]) {
        return new vscode.MarkdownString(hoverData[word]);
    }
    return undefined;
}
function getCompletionItems() {
    const tags = [
        {
            tag: 'sjml',
            description: 'The `<sjml>` element represents the root of a SJML document.',
            documentation: 'https://hirujaedurapola.github.io/sjml/support#sjml'
        },
        {
            tag: 'window',
            description: '`window` represents the title of the webpage.',
            documentation: 'https://hirujaedurapola.github.io/sjml/support#window'
        },
        {
            tag: 'icon',
            description: 'The `icon` property sets the Favicon of the webpage. Using .ico file is strongly recommended while other formats are also accepted.',
            documentation: 'https://hirujaedurapola.github.io/sjml/support#icon'
        },
        {
            tag: 'ver',
            description: 'The `ver` property tells the converter about the SJML version used in the current file. Please check the documentation to find the newest version as `!template` might generate an older version of code.',
            documentation: 'https://hirujaedurapola.github.io/sjml/support#version'
        },
        {
            tag: 'dis',
            description: 'The `dis` property allows you to render basic texts in SJML.',
            documentation: 'https://hirujaedurapola.github.io/sjml/support#dis'
        },
        {
            tag: 'head',
            description: 'The `head` property allows you to render headline texts in SJML. Text is bolded and font size is 34px.',
            documentation: 'https://hirujaedurapola.github.io/sjml/support#head'
        },
        {
            tag: 'break',
            description: '`break()` is a function in SJML used for inserting line breaks.',
            documentation: 'https://hirujaedurapola.github.io/sjml/support#break'
        }
    ];
    const completionItems = tags.map(({ tag, description, documentation }) => {
        const item = new vscode.CompletionItem(tag, vscode.CompletionItemKind.Keyword);
        item.detail = description;
        item.documentation = new vscode.MarkdownString(`[Documentation](${documentation})`);
        return item;
    });
    return completionItems;
}
function updateDiagnostics(document, collection) {
    const diagnostics = [];
    const text = document.getText();
    const lines = text.split('\n');
    lines.forEach((line, i) => {
        const trimmedLine = line.trim();
        // Ignore comments and specific tags
        if (!trimmedLine.startsWith('>>') && !trimmedLine.endsWith('<<') &&
            trimmedLine && !trimmedLine.endsWith(';') &&
            !trimmedLine.endsWith('<sjml>') &&
            !trimmedLine.endsWith('</sjml>')) {
            const range = new vscode.Range(new vscode.Position(i, line.length - 1), new vscode.Position(i, line.length));
            const diagnostic = new vscode.Diagnostic(range, 'Missing semicolon', vscode.DiagnosticSeverity.Error);
            diagnostics.push(diagnostic);
        }
    });
    collection.set(document.uri, diagnostics);
}
function deactivate() { }
exports.deactivate = deactivate;

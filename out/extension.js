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
exports.activate = activate;
function getHoverContent(word) {
    const hoverData = {
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
function deactivate() { }
exports.deactivate = deactivate;

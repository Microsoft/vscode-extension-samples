// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

describe('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		expect([1, 2, 3].indexOf(5)).toBe(-1);
		expect([1, 2, 3].indexOf(0)).toBe(-1);
	});

	test('Sample snapshot test', () => {
		expect({ hello: 'world' }).toMatchSnapshot();
	});

	test('Sample inline snapshot test', () => {
		expect({ hello: 'world' }).toMatchInlineSnapshot(`
		Object {
		  "hello": "world",
		}
	`);
	});
});

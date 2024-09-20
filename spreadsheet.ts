/**
 * @class
 */
class Spreadsheet {
	/**
	 * @type {string}
	 * @memberof Spreadsheet
	 */
	spreadSheetId: string = '';

	/**
	 * @type {GoogleAppsScript.Spreadsheet.Spreadsheet}
	 * @memberof Spreadsheet
	 */
	spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet | undefined;

	/**
	 * @type {GoogleAppsScript.Spreadsheet.Sheet}
	 * @memberof Spreadsheet
	 */
	sheet: GoogleAppsScript.Spreadsheet.Sheet | undefined;

	/**
	 * @type {string[]}
	 * @memberof Spreadsheet
	 */
	columns: string[] = [];

	/**
	 * @param spreadSheetId
	 * @param sheetName
	 */
	constructor(spreadSheetId: string | null = null, sheetName: string | null = null) {
		if (spreadSheetId) this.getSpreadById(spreadSheetId);
		if (sheetName) this.setSheetByName(sheetName);
	}

	/**
	 * Get SpreadSheet by Id
	 *
	 * @param {string} spreadSheetId
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	getSpreadById(spreadSheetId: string): this {
		this.spreadSheetId = spreadSheetId;
		this.spreadSheet = SpreadsheetApp.openById(spreadSheetId);
		return this;
	}

	/**
	 * Get SpreadSheet by Url
	 *
	 * @param {string} spreadSheetUrl
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	getSpreadByUrl(spreadSheetUrl: string): this {
		this.spreadSheet = SpreadsheetApp.openByUrl(spreadSheetUrl);
		this.spreadSheetId = this.spreadSheet.getId();
		return this;
	}

	/**
	 * Set Sheet by Name
	 *
	 * @param {string} sheetName
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	setSheetByName(sheetName: string): this {
		if (!this.spreadSheet) throw new Error('SpreadSheet not found');
		const sheet = this.spreadSheet.getSheetByName(sheetName);
		if (!sheet) throw new Error(`Sheet ${sheetName} not found`);
		this.sheet = sheet;
		this.getColumns();
		return this;
	}

	/**
	 * Get Columns
	 *
	 * @return {*}  {string[]}
	 * @memberof Spreadsheet
	 */
	private getColumns(): string[] {
		if (!this.sheet) throw new Error('Spreadsheet not found');
		if (!this.columns.length) {
			const values = this.sheet.getRange(1, 1, 1, this.sheet.getLastColumn()).getValues();
			this.columns = values[0];
		}
		return this.columns;
	}

	/**
	 * Get Row by Key
	 *
	 * @param {(string | number)} key
	 * @param {number} [column=0]
	 * @return {*}  {number}
	 * @memberof Spreadsheet
	 */
	getRowByKey(key: string | number, column: number = 0): number {
		const values = this.getValues();
		for (let i = 0; i < values.length; i++) {
			if (values[i][column] === key) return i + 1;
		}
		throw new Error(`Key ${key} not found`);
	}

	/**
	 * Get Last Row
	 *
	 * @return {*}  {number}
	 * @memberof Spreadsheet
	 */
	getLastRow(): number {
		if (!this.sheet) throw new Error('Spreadsheet not found');
		const rows = this.sheet.getRange('A:A').getValues(); //A列の値を全て取得
		return rows.filter(String).length; //空白の要素を除いた長さを取得
	}

	/**
	 * Get Values
	 *
	 * @return {*}  {any[][]}
	 * @memberof Spreadsheet
	 */
	getValues(): any[][] {
		if (!this.sheet) throw new Error('Spreadsheet not found');
		return this.sheet.getDataRange().getValues();
	}

	/**
	 * Set Values
	 *
	 * @param {number} rowId
	 * @param {any[][]} values
	 * @memberof Spreadsheet
	 */
	setValues(rowId: number, values: any[][]): void {
		if (!this.sheet) throw new Error('Spreadsheet not found');
		this.sheet.getRange(rowId, 1, values.length, values[0].length).setValues(values);
	}
}

var SpreadSheet = Spreadsheet;

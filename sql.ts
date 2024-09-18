type RecordType = { [key: string]: string | number };
class SQL {
	spreadSheetId: string;
	spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
	sheet: GoogleAppsScript.Spreadsheet.Sheet;

	sqlSelect: string[] = [];
	sqlWhere: RecordType = {};
	sqlOrWhere: RecordType = {};
	sqlWhereIn: { column: string; values: (string | number)[] }[] = [];

	rowId: number = 0;

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
		return this;
	}

	/**
	 * Set Columns to Select
	 *
	 * @param {string[]} columns
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	select(columns: string[]): this {
		return this;
	}

	/**
	 * Set Where Clause
	 *
	 * @param {RecordType} wheres
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	where(wheres: RecordType): this {
		return this;
	}

	/**
	 * Set Or Where Clause
	 *
	 * @param {RecordType} wheres
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	orWhere(wheres: RecordType): this {
		return this;
	}

	/**
	 * Set Where In Clause
	 *
	 * @param {string} column
	 * @param {((string | number)[])} values
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	whereIn(column: string, values: (string | number)[]): this {
		return this;
	}

	/**
	 * Get Records
	 *
	 * @return {*}  {RecordType[]}
	 * @memberof SQL
	 */
	get(): RecordType[] {
		return [];
	}

	/**
	 * Get First Record
	 *
	 * @return {*}  {*}
	 * @memberof SQL
	 */
	first(): any {
		this.rowId = 0;
		return {};
	}

	/**
	 * Fill Record
	 *
	 * @param {RecordType} data
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	fill(data: RecordType): this {
		return this;
	}

	/**
	 * Save Record
	 *
	 * @return {*}  {boolean}
	 * @memberof SQL
	 */
	save(): boolean {
		if (this.rowId) {
			// update
		} else {
			// insert
		}
		return false;
	}
}

this.sql = SQL;

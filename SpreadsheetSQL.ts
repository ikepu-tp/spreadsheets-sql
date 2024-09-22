function _() {}

/**
 * @param {(string | null)} [spreadSheetId=null]
 * @param {(string | null)} [sheetName=null]
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function SQL(spreadSheetId: string | null = null, sheetName: string | null = null): SQL_ {
	return new SQL_(spreadSheetId, sheetName);
}

// mocks for JSDoc

/**
 * Get SpreadSheet by Id
 *
 * @param {string} spreadSheetId
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function getSpreadById(spreadSheetId: string): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Get SpreadSheet by Url
 *
 * @param {string} spreadSheetUrl
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function getSpreadByUrl(spreadSheetUrl: string): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Set Sheet by Name
 *
 * @param {string} sheetName
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function setSheetByName(sheetName: string): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Get Columns
 *
 * @return {*}  {string}
 */
function getKeyName(): string {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Set Key Name
 *
 * @param {string} keyName
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function setKeyName(keyName: string): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Set Columns to Select
 *
 * @param {string[]} columns
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function select(columns: string[]): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Set Where Clause
 *
 * @param {RecordType} wheres
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function where(wheres: RecordType): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Set Or Where Clause
 *
 * @param {RecordType} wheres
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function orWhere(wheres: RecordType): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Set Where In Clause
 *
 * @param {string} column
 * @param {((string | number)[])} values
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function whereIn(column: string, values: (string | number)[]): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Get Records
 *
 * @return {*}  {RecordType[]}
 */
function get(): RecordType[] {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Get First Record
 *
 * @return {*}  {*}
 */
function first(): RecordType | null {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Fill Record
 *
 * @param {RecordType} data
 * @return {SpreadsheetSQL}  {SpreadsheetSQL}
 */
function fill(data: RecordType): SQL_ {
	throw new Error('This is a mock function for JSDoc.');
}

/**
 * Save Record
 *
 * @return {*}  {boolean}
 */
function save(): boolean {
	throw new Error('This is a mock function for JSDoc.');
}
/**
 * Convert Record to Data
 *
 * @param {RecordType} record
 * @return {*}  {any[]}
 */
function convertRecordToData(record: RecordType): any[] {
	throw new Error('This is a mock function for JSDoc.');
}
/**
 * Convert Data to Record
 *
 * @param {any[]} data
 * @return {*}  {RecordType}
 */
function convertDataToRecord(data: any[]): RecordType {
	throw new Error('This is a mock function for JSDoc.');
}

type RecordType = { [key: string]: string | number };

/**
 * @class SQL
 * @public
 */
class SQL {
	/**
	 * @type {Spreadsheet}
	 * @memberof SQL
	 */
	Spreadsheet: Spreadsheet = new Spreadsheet();

	/**
	 * @type {string}
	 * @memberof SQL
	 */
	keyName: string = '';

	/**
	 * @type {string[]}
	 * @memberof SQL
	 */
	sqlSelect: string[] = [];

	/**
	 * @type {RecordType}
	 * @memberof SQL
	 */
	sqlWhere: RecordType = {};

	/**
	 * @type {RecordType}
	 * @memberof SQL
	 */
	sqlOrWhere: RecordType = {};

	/**
	 *
	 *  @type {({ column: string; values: (string | number)[] }[])}
	 * @memberof SQL
	 */
	sqlWhereIn: { column: string; values: (string | number)[] }[] = [];

	rowId: number = 0;
	/**
	 * @type {RecordType}
	 * @memberof SQL
	 */
	fillData: RecordType = {};

	/**
	 * @param {string | null} spreadSheetId
	 * @param {string | null } sheetName
	 * @memberof SQL
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
		this.Spreadsheet = new Spreadsheet(spreadSheetId);
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
		this.Spreadsheet = new Spreadsheet();
		this.Spreadsheet.getSpreadByUrl(spreadSheetUrl);
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
		this.Spreadsheet.setSheetByName(sheetName);
		return this;
	}

	/**
	 * Get Columns
	 *
	 * @return {*}  {string}
	 * @memberof SQL
	 */
	getKeyName(): string {
		if (!this.keyName) {
			this.keyName = this.Spreadsheet.columns[0];
		}
		return this.keyName;
	}

	/**
	 * Set Key Name
	 *
	 * @param {string} keyName
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	setKeyName(keyName: string): this {
		this.keyName = keyName;
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
		this.sqlSelect = columns;
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
		this.sqlWhere = wheres;
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
		this.sqlOrWhere = wheres;
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
		this.sqlWhereIn.push({ column, values });
		return this;
	}

	/**
	 * Get Records
	 *
	 * @return {*}  {RecordType[]}
	 * @memberof SQL
	 */
	get(): RecordType[] {
		let values = this.Spreadsheet.getValues();

		//配列の変換
		let datas = values
			.splice(1)
			.map((value) => this.convertDataToRecord(value))
			.filter((data) => {
				// where
				if (Object.keys(this.sqlWhere).some((key) => data[key] !== this.sqlWhere[key])) return false;

				//orWhere
				if (!Object.keys(this.sqlOrWhere).some((key) => data[key] === this.sqlOrWhere[key])) return false;

				// whereIn
				if (this.sqlWhereIn.some((whereIn) => !whereIn.values.includes(data[whereIn.column]))) return false;

				return true;
			});

		//select
		if (this.sqlSelect.length > 0)
			datas = datas.map((data) => {
				const record: RecordType = {};
				this.sqlSelect.forEach((column) => {
					if (data[column] !== undefined) record[column] = data[column];
				});
				return record;
			});
		return datas;
	}

	/**
	 * Get First Record
	 *
	 * @return {*}  {*}
	 * @memberof SQL
	 */
	first(): RecordType | null {
		const res = this.get();
		this.rowId = 0;
		if (res.length === 0) return null;
		this.rowId = this.Spreadsheet.getRowByKey(
			res[0][this.getKeyName()],
			this.Spreadsheet.columns.indexOf(this.getKeyName())
		);
		return res[0];
	}

	/**
	 * Fill Record
	 *
	 * @param {RecordType} data
	 * @return {*}  {this}
	 * @memberof SQL
	 */
	fill(data: RecordType): this {
		this.fillData = data;
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
			this.rowId = this.Spreadsheet.getLastRow() + 1;
			if (!this.fillData[this.getKeyName()]) this.fillData[this.getKeyName()] = this.rowId;
		}
		this.Spreadsheet.setValues(this.rowId, [this.convertRecordToData(this.fillData)]);
		return false;
	}

	/**
	 * Convert Record to Data
	 *
	 * @param {RecordType} record
	 * @return {*}  {any[]}
	 * @memberof SQL
	 */
	convertRecordToData(record: RecordType): any[] {
		const data: any[] = [];
		this.Spreadsheet.columns.forEach((column) => {
			data.push(record[column] || '');
		});
		return data;
	}

	/**
	 * Convert Data to Record
	 *
	 * @param {any[]} data
	 * @return {*}  {RecordType}
	 * @memberof SQL
	 */
	convertDataToRecord(data: any[]): RecordType {
		const record: RecordType = {};
		this.Spreadsheet.columns.forEach((column, index) => {
			record[column] = data[index];
		});
		return record;
	}
}

var Sql: typeof SQL = SQL;

/**
 *
 * @param {string | null} spreadSheetId
 * @param {string | null} sheetName
 * @return {*} {SQL}
 */
function createSql(spreadSheetId: string | null = null, sheetName: string | null = null): SQL {
	return new Sql(spreadSheetId, sheetName);
}

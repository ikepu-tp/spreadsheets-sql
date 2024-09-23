type RecordType = { [key: string]: string | number };
type OperatorType = '=' | '<' | '>' | '<=' | '>=' | '<>' | '!=';
type WhereType = [string, OperatorType, string | number] | [string, string | number];

/**
 * @class SQL
 * @public
 */
class SQL_ {
	/**
	 * @type {Spreadsheet}
	 */
	Spreadsheet: Spreadsheet = new Spreadsheet();

	/**
	 * @type {string}
	 */
	keyName: string = '';

	/**
	 * @type {string[]}
	 */
	sqlSelect: string[] = [];

	/**
	 * @type {WhereType[]}
	 */
	sqlWhere: WhereType[] = [];

	/**
	 * @type {WhereType[]}
	 */
	sqlOrWhere: WhereType[] = [];

	/**
	 *
	 *  @type {({ column: string; values: (string | number)[] }[])}
	 */
	sqlWhereIn: { column: string; values: (string | number)[] }[] = [];

	rowId: number = 0;
	/**
	 * @type {RecordType}
	 */
	rowData: RecordType = {};
	/**
	 * @type {RecordType}
	 */
	fillData: RecordType = {};

	/**
	 * @param {string | null} spreadSheetId
	 * @param {string | null } sheetName
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
	 */
	setSheetByName(sheetName: string): this {
		this.Spreadsheet.setSheetByName(sheetName);
		return this;
	}

	/**
	 * Get Columns
	 *
	 * @return {*}  {string}
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
	 */
	select(columns: string[]): this {
		this.sqlSelect = columns;
		return this;
	}

	/**
	 * Set Where Clause
	 *
	 * @param {WhereType[] | WhereType} wheres
	 * @return {*}  {this}
	 */
	where(wheres: WhereType[] | WhereType): this {
		if (wheres.length === 0) return this;

		if (!Array.isArray(wheres[0])) {
			this.sqlWhere.push(wheres as WhereType);
		} else {
			this.sqlWhere = this.sqlWhere.concat(wheres);
		}

		return this;
	}

	/**
	 * Set Or Where Clause
	 *
	 * @param {WhereType[] | WhereType} wheres
	 * @return {*}  {this}
	 */
	orWhere(wheres: WhereType[] | WhereType): this {
		if (wheres.length === 0) return this;

		if (!Array.isArray(wheres[0])) {
			this.sqlOrWhere.push(wheres as WhereType);
		} else {
			this.sqlOrWhere = this.sqlOrWhere.concat(wheres);
		}

		return this;
	}

	/**
	 * Set Where In Clause
	 *
	 * @param {string} column
	 * @param {((string | number)[])} values
	 * @return {*}  {this}
	 */
	whereIn(column: string, values: (string | number)[]): this {
		this.sqlWhereIn.push({ column, values });
		return this;
	}

	/**
	 * Get Records
	 *
	 * @return {*}  {RecordType[]}
	 */
	get(): RecordType[] {
		let values = this.Spreadsheet.getValues();

		//配列の変換
		let datas = values
			.splice(1)
			.map((value) => this.convertDataToRecord(value))
			.filter((data) => {
				// where
				if (this.sqlWhere.length > 0 && !this.sqlWhere.every((condition) => this.evaluateCondition(data, condition)))
					return false;

				//orWhere
				if (this.sqlOrWhere.length > 0 && !this.sqlOrWhere.some((condition) => this.evaluateCondition(data, condition)))
					return false;

				// whereIn
				if (
					this.sqlWhereIn.length > 0 &&
					!this.sqlWhereIn.every((whereIn) => whereIn.values.includes(data[whereIn.column]))
				)
					return false;

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
	 * Evaluate Condition
	 *
	 * @private
	 * @param {RecordType} data
	 * @param {WhereType} condition
	 * @return {*}  {boolean}
	 * @memberof SQL_
	 */
	private evaluateCondition(data: RecordType, condition: WhereType): boolean {
		if (!Array.isArray(condition) || condition.length < 2 || condition.length > 3) {
			throw new Error('Invalid condition.');
		}

		let [key, operatorOrValue, value] = condition;
		const dataValue = data[key];

		// 値だけ指定された場合（例: [key, value]）、等価（===）のチェックを行う
		if (condition.length === 2) return dataValue === operatorOrValue;
		value = value as string | number;

		// オペレーターに基づいて適切な条件を適用
		switch (operatorOrValue) {
			case '=':
				return dataValue === value;
			case '<':
				return dataValue < value;
			case '>':
				return dataValue > value;
			case '<=':
				return dataValue <= value;
			case '>=':
				return dataValue >= value;
			case '!=':
			case '<>':
				return dataValue !== value;
			default:
				throw new Error('Invalid operator.');
		}
	}

	/**
	 * Get First Record
	 *
	 * @return {*}  {*}
	 */
	first(): RecordType | null {
		const res = this.get();
		this.rowId = 0;
		if (res.length === 0) return null;
		this.rowId = this.Spreadsheet.getRowByKey(
			res[0][this.getKeyName()],
			this.Spreadsheet.columns.indexOf(this.getKeyName())
		);
		this.rowData = res[0];
		return this.rowData;
	}

	/**
	 * Get Last Record
	 *
	 * @return {*}  {(RecordType | null)}
	 * @memberof SQL_
	 */
	last(): RecordType | null {
		const res = this.get();
		this.rowId = 0;
		if (res.length === 0) return null;
		const last = res.length - 1;
		this.rowData = res[last];
		this.rowId = this.Spreadsheet.getRowByKey(
			this.rowData[this.getKeyName()],
			this.Spreadsheet.columns.indexOf(this.getKeyName())
		);
		return this.rowData;
	}

	/**
	 * Find Record
	 *
	 * @param {(string | number)} key
	 * @param {(string | '')} keyName
	 * @return {*}  {(RecordType | null)}
	 * @memberof SQL_
	 */
	find(key: string | number, keyName: string = ''): RecordType | null {
		if (keyName === '') keyName = this.getKeyName();
		this.where([keyName, key]);
		return this.first();
	}

	/**
	 * Fill Record
	 *
	 * @param {RecordType} data
	 * @return {*}  {this}
	 */
	fill(data: RecordType): this {
		this.fillData = data;
		return this;
	}

	/**
	 * Save Record
	 *
	 * @return {*}  {boolean}
	 */
	save(): void {
		if (!this.rowId) {
			// insert
			this.rowId = this.Spreadsheet.getLastRow() + 1;
			if (!this.fillData[this.getKeyName()]) this.fillData[this.getKeyName()] = this.rowId - 1;
		}
		this.Spreadsheet.setValues(this.rowId, [this.convertRecordToData({ ...this.rowData, ...this.fillData })]);
	}

	/**
	 * Delete Record
	 *
	 * @return {*}  {void}
	 */
	deleteRecord(): void {
		if (!this.rowId) throw new Error('RowId not found');
		this.Spreadsheet.deleteRows(this.rowId, 1);
	}

	/**
	 * Convert Record to Data
	 *
	 * @param {RecordType} record
	 * @return {*}  {any[]}
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
	 */
	convertDataToRecord(data: any[]): RecordType {
		const record: RecordType = {};
		this.Spreadsheet.columns.forEach((column, index) => {
			record[column] = data[index];
		});
		return record;
	}
}

var SqlClass: typeof SQL_ = SQL_;

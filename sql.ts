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

	constructor(spreadSheetId = null) {
		if (this.spreadSheetId !== null) this.getSpreadById(spreadSheetId as unknown as string);
	}

	getSpreadById(spreadSheetId: string) {
		this.spreadSheetId = spreadSheetId;
		this.spreadSheet = SpreadsheetApp.openById(spreadSheetId);
	}

	getSpreadByUrl(spreadSheetUrl: string) {
		this.spreadSheet = SpreadsheetApp.openByUrl(spreadSheetUrl);
		this.spreadSheetId = this.spreadSheet.getId();
	}

	setSheetByName(sheetName: string): this {
		const sheet = this.spreadSheet.getSheetByName(sheetName);
		if (!sheet) throw new Error(`Sheet ${sheetName} not found`);
		this.sheet = sheet;
		return this;
	}

	select(columns: string[]): this {
		return this;
	}

	where(wheres: RecordType): this {
		return this;
	}

	orWhere(wheres: RecordType): this {
		return this;
	}

	whereIn(column: string, values: (string | number)[]): this {
		return this;
	}

	get(): any[] {
		return [];
	}

	first(): any {
		this.rowId = 0;
		return {};
	}

	fill(data: RecordType): this {
		return this;
	}

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

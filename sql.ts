class SQL {
	spreadSheetId: string;
	spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
	sheet: GoogleAppsScript.Spreadsheet.Sheet;

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

	setSheetByName(sheetName: string) {
		const sheet = this.spreadSheet.getSheetByName(sheetName);
		if (!sheet) throw new Error(`Sheet ${sheetName} not found`);
		this.sheet = sheet;
		return this.sheet;
	}
}

this.sql = SQL;

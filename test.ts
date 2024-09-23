const spreadSheetId = '1CtOTOsF_RIUN_9cYk7B1J2-ov6tpYf_jRmPB1KNXtKw';
const sheetName = 'test';

let testCount = 0;
let successCount = 0;
let failedCount = 0;

function sql() {
	return new SQL_(spreadSheetId, sheetName);
}
function sqlWhereTest() {
	newSaveTest();
	saveTest();
	getTest();
	deleteTest();
	result();
}

function deleteTest() {
	const sqlLast = sql();
	const last = sqlLast.last();
	if (last === null) throw new Error('last is null');
	sqlLast.deleteRecord();
	assert('idが最後を削除', sql().last(), (data: RecordType) => data['id'] != last['id']);
}

function newSaveTest() {
	const newSql = sql();
	newSql.fill({ name: 'new name', test: 'new test' }).save();
	assert('新規保存', sql().find(newSql.fillData['id']), (data: RecordType) => data['id'] === newSql.fillData['id']);
}

function saveTest() {
	const sql5 = sql().where(['id', 5]);
	sql5.first();
	sql5.fill({ name: 'name' }).save(),
		assert('idが5のnameを変更', sql().where(['id', 5]).first(), (data: RecordType) => data['name'] === 'name');
	sql5.fill({ name: 'name5' }).save(),
		assert('idが5のnameを変更2', sql().where(['id', 5]).first(), (data: RecordType) => data['name'] === 'name5');
}

function getTest() {
	const sqlLast = sql().get();
	assert('idが最後', sql().last(), (data: RecordType) => data['id'] === sqlLast[sqlLast.length - 1]['id']);
	assert('idが5のfind', sql().find(5), (data: RecordType) => data['id'] === 5);
	assert('idが5のデータ1つのみ', sql().where(['id', '=', 5]).first(), (data: RecordType) => data['id'] === 5);
	assert('キーがidのみ', sql().select(['id']).get(), (data: RecordType[]) =>
		data.every((res) => Object.keys(res).length === 1 && Object.keys(res)[0] === 'id')
	);
	assert('idが3か6(OR)', sql().orWhere(['id', 3]).orWhere(['id', 6]).get(), (data: RecordType[]) =>
		data.every((res) => res['id'] === 3 || res['id'] === 6)
	);
	assert('idが3か6(IN)', sql().whereIn('id', [3, 6]).get(), (data: RecordType[]) =>
		data.every((res) => res['id'] === 3 || res['id'] === 6)
	);
	assert('idが5', sql().where(['id', '=', 5]).get(), (data: RecordType[]) => data.every((res) => res['id'] === 5));
	assert('idが5以上', sql().where(['id', '>=', 5]).get(), (data: RecordType[]) =>
		data.every((res) => (res['id'] as number) >= 5)
	);
	assert('idが5以下', sql().where(['id', '<=', 5]).get(), (data: RecordType[]) =>
		data.every((res) => (res['id'] as number) <= 5)
	);
	assert('idが5より大きい', sql().where(['id', '>', 5]).get(), (data: RecordType[]) =>
		data.every((res) => (res['id'] as number) > 5)
	);
	assert('idが5より小さい', sql().where(['id', '<', 5]).get(), (data: RecordType[]) =>
		data.every((res) => (res['id'] as number) < 5)
	);
}

function assert(test_name: string, data: any, isMatchExpected: (data: any) => boolean) {
	++testCount;
	//console.log(data)
	if (isMatchExpected(data)) {
		console.log(`${test_name}: success`);
		++successCount;
	} else {
		console.error(`${test_name}: failed`);
		++failedCount;
	}
}

function result() {
	console.log(`Total: ${testCount}, Success: ${successCount}, Failed: ${failedCount}`);
}

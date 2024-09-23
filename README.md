# SpreadsheetSQL

SpreadsheetSQL is a Google Apps Script (GAS) library that allows you to query Google Spreadsheets using SQL-like syntax. If you want to interact with your Google Spreadsheets in a more SQL-like manner using GAS, this library makes it possible.

## Installation

To install the library, use the following Script ID:

```bash
1RV4noVBniL1qVgNX0gqHM2qM_I2L-1dE8uSmuqyEklbBBgYw9eodmV65
```

If you are unsure how to install a GAS library, please refer to the official documentation.

## Documentation

For detailed usage instructions, please refer to the library documentation with [https://script.google.com/macros/library/d/1RV4noVBniL1qVgNX0gqHM2qM_I2L-1dE8uSmuqyEklbBBgYw9eodmV65/2](https://script.google.com/macros/library/d/1RV4noVBniL1qVgNX0gqHM2qM_I2L-1dE8uSmuqyEklbBBgYw9eodmV65/2).

### Opening Spreadsheet

```javascript
const sql = SpreadsheetSQL.SQL('spreadsheetId', "sheetName");
```

### Retrieving data

```javascript
sql.get();
```

#### Filtering data

If you want to filter data, you can use `where`, `orWhere` and `whereIn` method.

##### Using `where`

```javascript
sql.where(
  [
    "name", //columnName
    "=", //operator
    "John" //value
  ]
);
```

Operator can be `=`, `!=`, `>`, `<`, `>=` and `<=`.
If you use `=`, the operator can be omitted:

```javascript
sql.where(
  [
    "name", //columnName
    "John" //value
  ]
);
```

For multiple conditions, you can use nested arrays:

```javascript
sql.where(
  [
    [
      "name", //columnName
      "=", //operator
      "John" //value
    ],
    [
      "age", //columnName
      ">", //operator
      20 //value
    ]
  ]
);
```

##### Using `orWhere`

```javascript
sql.orWhere(
  [
    "name", //columnName
    "=", //operator
    "John" //value
  ]
);
```

##### Using `whereIn`

```javascript
sql.whereIn(
  [
    "name", //columnName
    ["John", "Mike"] //values
  ]
);
```

#### Selecting Specific Columns

To select specific columns, use the `select` method:

```javascript
sql.select(["name", "age"]);
```

#### Retrieving the First Record

To get only the first record, use the `first` method:

```javascript
sql.first();
```

#### Retrieving the Last Record

To get only the last record, use the `last` method:

```javascript
sql.last();
```

#### Finding a Specific Record

To find a specific record by its ID, use the `find` method:

```javascript
sql.find(1);
```

You can set a custom key name using the setKeyName method:

```javascript
sql.setKeyName('id');
sql.find(1);
```

### Saving new data

```javascript
sql.fill({name: 'John', age: 20});
sql.save();
```

### Updating existing data

```javascript
sql.find(1);
sql.fill({name: 'John', age: 21});
sql.save();
```

### Deleting existing data

```javascript
sql.find(1);
sql.deleteRecord();
```

## Contributing

We welcome contributions to the project! You can get involved through the following ways:

[Issue](https://github.com/ikepu-tp/spreadsheet-sql/issues): Use for bug reports, feature suggestions, and more.
[Pull Requests](https://github.com/ikepu-tp/spreadsheet-sql/pulls): We encourage code contributions for new features and bug fixes.

## License

This project is licensed under the [MIT License](./LICENSE). You are free to use, copy, modify, and distribute this software under the conditions specified in the license.

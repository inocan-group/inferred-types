# CSV Functionality

A popular format for structured data is to use a CSV (comma separated values) where rows of data are separated by new line characters and each _column_ of data is separated by the comma character.

This library provides type and runtime support to help move from:

- a _string_ containing CSV data to structured data
- structured data to a CSV string


## FromCsv

The [`FromCsv<T>`](../modules/types/src/lists/FromCsv.ts) type utility and the [`fromCsv(data)`](../modules/runtime/src/lists/fromCsv.ts) runtime utility are responsible for converting CSV data stored in a string into a one of two formats:

- a multidimensional array (described as `[][]` by the "format" parameter/generic)
- an array of key/value dictionaries, where the _keys_ are the column headers for the CSV data
    - in order to use this latter format, you'll need column names
    - it is not an unusual convention to have the first row of data be the column names but that varies by data source
        - When we do have the first row as column names both runtime and type utilities will handle this gracefully when the `KV[]` format is chosen.
        - If we know the column names but they are not included in the data string, we can provide the column names as a string-literal array in the runtime function. The type utility doesn't provide this functionality but the runtime function is able to leverage the type utility such that all types remain narrow (where the inputs allow)

## ToCsv

The [`ToCsv<T>`](../modules/types/src/lists/ToCSV.ts) type utility and [`toCsv(data)`](../modules/runtime/src/lists/toCsv.ts) runtime function are responsible for converting structured data into CSV form.

- a _single dimensional array_ of strings, numbers, or booleans will be converted into a string that is comma delimited
    - To help avoid collisions with the comma character, if a string value has a comma character then the string will be quoted to indicate that it should be treated as a block
- when using the runtime function, we can not only apply a single "row" of CSV data but a full table of data:
    - a _multidimensional array_ will be translated row by row using the same logic -- on a _per row_ basis -- as the single dimensional array
    - you can also pass in an array of key/value dictionaries where the _keys_ represent the column names. In this case the CSV data will be added and the columns names will be included as the first row of the data (unless explicitly asked not to).

## CSV Validation

- the `IsCSV` type utility is a _boolean operator_ which tests whether a string "looks like" CSV data.
    - This isn't a highly sophisticated test but simply checks a literal string to see if each line in the string contains a `,` character in it. Returning true/false based on this logic.
    - If a wide string is passed in then we can't determine this at design time so `boolean` is returned.
- the `isCsv(val)` type guard is provided to the runtime using the same validation logic and if the test passes the string is _branded_ as a `Csv` type.

## Related

- [JSON Functionality](./json.md)
- [Converting Data Structures to String Literals](./to-string-literals.md)

import type { Dictionary } from "inferred-types/types";


/**
 * **toCsv**`(data) -> string`
 *
 * Converts structured data into a _strongly typed_ CSV string.
 *
 * - the data structures supported as inputs include:
 *     1. **Scalar Array** `(string | number | boolean)[]`
 *        - this is treated as a single row of CSV data
 *     2. **Multidimensional Array** `(string | number | boolean)[][]`
 *        - this is treated as a rows _by_ columns data structure
 *     3. **Key/Value Dictionary**
 *        - treated as a single row of CSV data, where:
 *        - the _rows_ are the column names,
 *        - the _values_ are the cell values in the CSV row
 *     4. **Array of Key/Value Dictionaries**
 *        - the _keys_ will be treated as the column names
 *        - the output structure will be as a rows by columns
 *          data structure
 *
 * - by default if "column names" are known to exist then they will
 *   be included as the first row of the data
 *   - any Dictionary based input is _known_ to have column names
 *   - for a multidimensional input the default assumption is that
 *   there is _not_ a
 *
 * ### Related
 * - `fromCsv()`, `ToCsv`, `FromCsv`
 */
export function toCsv<
    const T extends string[] | string[][] | Dictionary | Dictionary<string>[]
>(
    data: T
) {

}

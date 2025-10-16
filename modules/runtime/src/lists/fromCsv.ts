import { FromCsv } from "inferred-types/types";
import { afterFirst } from "runtime/lists/afterFirst";
import { isArray } from "runtime/type-guards";

type WithFormat<T extends "[][]" | "KV[]" | string[]> = T extends string[]
    ? "KV[]"
    : T;

/**
 * Converts CSV data stored as a _string_ to the data
 * structure defined by the data.
 *
 * - the optional `format` parameter allows you to choose
 * between two different output formats:
 *
 *     1. **`[][]`** is the default an provides a multidimensional format
 *      with no explicit concept of "column names"
 *     2. **`KV[]`** can be used to get back an array of key/value dictionaries
 *      where the _keys_ are the column names. If you specify `KV[]` as the
 *      format then you need to have column names as the first row in your
 *      data. If you want this KV format but your data doesn't have this
 *      column name data you can instead just pass in the column names into
 *      the `format` parameter.
 *
 *      **Note:** if using the `KV[]` format and columnar data exceeds the
 *      number of columns defined in the "headers" the remaining columns will
 *      be lost in the resultant data structure.
 * - the optional `resolve` parameter allows you convert `NumberLike` values
 * to numbers and `BooleanLike` values to booleans.
 * - regardless of `format` or `resolve` settings, quoted strings (e.g., any
 * string literal which after having been trimmed starts and ends with a quote
 * character) will be treated as a block where the comma character can reside
 * without being treated as a column delimiter
 *      - when a quoted string _is_ found, the quotes are removed as the _utility_
 *      of these quotes is assumed to allow for allowing normal prose without
 *      the risk of having a comma accidentally be treated as a column break
 */
export function fromCsv<
    const T extends string,
    F extends "[][]" | "KV[]" | string[],
    R extends boolean
>(
    csv: T,
    format: F = "[][]" as F,
    resolve: R = false as R
): FromCsv<T,WithFormat<F>, R> {
    if(format === "[][]") {
        const rows = csv.split("\n");
        return rows.map(i => {
            return i.split(",").map(i => i.trim());
        }) as FromCsv<T,WithFormat<F>, R>
    } else {
        const data = csv.split("\n");
        const [headers, rows] = isArray(format)
            ? [ format, data ]
            : [ data[0].split(","), afterFirst(data) ];

        const colCount = headers.length;
        type Shape = Record<
            string,
            string
        >

        let overflowCount = 0;
        let result: Shape[]  = [];

        for (const row of rows) {
            const columns = row.split(",").map(i => i.trim());
            const kv = headers.reduce(
                (acc, k) => {
                    if(k in columns) {
                        return {
                            ...acc,
                            [k]: columns[k as any]
                        }
                    }
                    return {
                        ...acc,
                        [k]: ""
                    }

                }, {}
            )
        }

        return result as FromCsv<T,WithFormat<F>, R>;
    }
}


import { Never } from "src/constants/Never";
import { isNumberLike } from "../type-guards";
import { CsvToJsonTuple, CsvToTuple, CsvToTupleStr } from "src/types/index";

export type CsvFormat =
| "string-tuple"
| "string-numeric-tuple"
| "json-tuple";


/**
 * **csv**`(csv, [format])`
 *
 * Converts a CSV string literal into a tuple of values
 * (based on format).
 *
 * **Note:** either _no space_ or _a single space_ between values
 * will provide a trimmed value but any additional whitespace
 * after the comma will result in some leading whitespace in
 * some values.
 *
 * @default format `string-numeric-tuple`
 */
export const csv = <
  T extends string,
  F extends CsvFormat = `string-numeric-tuple`
>(
  csv: T,
  format: F = `string-numeric-tuple` as F
) => {

  const tuple: unknown[] = [];

  csv.split(/,\s{0,1}/).forEach(v => {
    tuple.push(
      format === "string-numeric-tuple"
        ? isNumberLike(v) ? Number(v) : v
        : format === "json-tuple"
          ? isNumberLike(v)
            ? Number(v)
            : v === "true" ? true : v === "false" ? false
            : `"${v}"`
        : format === "string-tuple"
          ? `${v}`
          : Never
    )
  })

  return tuple as F extends "string-numeric-tuple"
    ? CsvToTuple<T>
    : F extends "json-tuple"
    ? CsvToJsonTuple<T>
    : F extends "string-tuple"
    ? CsvToTupleStr<T>
    : never
}

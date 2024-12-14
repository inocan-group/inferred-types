import type { StripLeading, TupleToUnion } from "inferred-types/types";
import { isNumber } from "src/type-guards/numeric/isNumber";

/**
 * **stripLeading**(content, ...strip)
 *
 * Runtime utility which strips of a leading substring from the
 * primary content if it exists and leaves content unchanged otherwise.
 */
export function stripLeading<
  T extends string | number,
  U extends readonly (string | number)[],
>(
  content: T,
  ...strip: U
) {
  let output: string = String(content);

  for (const s of strip) {
    if (output.startsWith(String(s))) {
      output = output.slice(String(s).length);
    }
  }

  return (
    isNumber(content) ? Number(output) : output
  ) as unknown as StripLeading<T, TupleToUnion<U>>;
}

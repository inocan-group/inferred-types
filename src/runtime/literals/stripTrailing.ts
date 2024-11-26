import { StripTrailing, TupleToUnion } from "inferred-types/types";
import { isNumber } from "../type-guards/index";

/**
 * **stripTrailing**(content, strip)
 *
 * Runtime utility which ensures that last part of a string has substring
 * removed if it exists and that strong typing is preserved.
 */
export function stripTrailing<
  T extends string | number,
  U extends readonly (string | number)[]
>(
  content: T,
  ...strip: U
): StripTrailing<T, TupleToUnion<U>> {
  let output: string = String(content);

  for (const s of strip) {
    if (output.endsWith(String(s))) {
      output = output.slice(0,-1 * String(s).length);
    }
  }

  return (
    isNumber(content) ? Number(output) : output
  ) as unknown as StripTrailing<T, TupleToUnion<U>>
}


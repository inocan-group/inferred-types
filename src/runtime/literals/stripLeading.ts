import { StripLeading, TupleToUnion } from "src/types/index";

/**
 * **stripLeading**(content, ...strip)
 *
 * Runtime utility which strips of a leading substring from the
 * primary content if it exists and leaves content unchanged otherwise.
 */
export function stripLeading<
  T extends string,
  U extends string[]
>(
  content: T,
  ...strip: U
): StripLeading<T, TupleToUnion<U>> {
  const stripper = strip.find(i => content.startsWith(i));
  return (
    stripper
      ? // starts with
        content.slice(stripper.length)
      : // does not
        content
  ) as StripLeading<T, TupleToUnion<U>>;
}

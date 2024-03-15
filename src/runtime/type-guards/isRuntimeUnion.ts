import { RuntimeUnion } from "src/types/index";


/**
 * **isRuntimeUnion**
 * 
 * A type guard which checks whether the passed in value is a `RuntimeUnion`.
 */
export const isRuntimeUnion = <T extends unknown[]>(val: unknown): val is RuntimeUnion<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof val === "object" && "kind" in (val as object) && (val as any).kind === "Union" ? true : false;
}

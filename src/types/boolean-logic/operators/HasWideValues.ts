import { AfterFirst, First, IsWideType } from "inferred-types/dist/types/index";

type Validate<T extends readonly unknown[]> = [] extends T
? false
: IsWideType<First<T>> extends true
  ? true
  : Validate<AfterFirst<T>>;

/**
 * **HasWideValues**`<T>`
 *
 * Tests whether any values in the tuple are _wide_ (aka, not a literal) value.
 */
export type HasWideValues<T extends readonly unknown[]> = Validate<T>;

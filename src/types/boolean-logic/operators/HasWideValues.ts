import { AfterFirst, First, IsLiteral } from "src/types/index";

type Validate<T extends readonly unknown[]> = [] extends T
? false
: IsLiteral<First<T>> extends true
  ? Validate<AfterFirst<T>>
  : true;

/**
 * **HasWideValues**`<T>`
 * 
 * Tests whether any values in the tuple are _wide_ (aka, not a literal) value.
 */
export type HasWideValues<T extends readonly unknown[]> = Validate<T>;

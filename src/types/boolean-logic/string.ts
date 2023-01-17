import { IsStringLiteral, Narrowable, Not } from "src/types";
import { And, IfAnd } from "./And";

/**
 * **IsString**
 *
 * Type utility which returns true/false based on whether `T` is a
 * string (wide or narrow).
 */
export type IsString<T> = T extends string ? true : false;

/**
 * **IfString**`<T,TRUE,FALSE>`
 *
 * Type utility which determines if `T` is a _string_ (wide or narrow) and
 * returns `TRUE` type if it is, otherwise returns the type `FALSE`.
 */
export type IfString<
  T extends Narrowable, //
  TRUE extends Narrowable,
  FALSE extends Narrowable
> = IsString<T> extends true ? TRUE : IsString<T> extends false ? FALSE : TRUE | FALSE;

/**
 * **IfWideString**`<T,TRUE,FALSE>`
 * 
 * Type utility which maps to type `IF` when `T` is a _wide_ "string" type and 
 * maps to `ELSE` type otherwise.
 */
export type IfWideString<
  T extends Narrowable, //
  TRUE extends Narrowable,
  FALSE extends Narrowable
> = IfAnd<[IsString<T>, Not<IsStringLiteral<T>>], TRUE, FALSE>;



/**
 * **Includes**`<Source, LookFor>`
 * 
 * A string-based type utility which attempts to ascertain whether `LookFor` is a valid
 * substring included in `Source`. 
 * 
 * This utility will accept narrow _or_ wide string types for generic values which means 
 * that `boolean` will become the return type whenever either of the generics is a wide 
 * type as actual value is unknown at design time.
 * 
 * **Related:** `IncludesNarrowly`
 */
export type Includes<
  Source extends Narrowable,
  LookFor extends string,
> = Source extends string
? Source extends `${string}${LookFor}${string}`
  ? true
  : And<[IsStringLiteral<Source>, IsStringLiteral<LookFor>]> extends true
    ? false
    : boolean
: false;


/**
 * **IncludesNarrowly**`<Source, LookFor>`
 * 
 * A string-based type utility which attempts to ascertain whether `LookFor` is a valid
 * substring included in `Source`.
 * 
 * This utility will accept only narrow generic values which means the only valid
 * return values are `true` or `false`
 * 
 * **Related:** `Includes`
 */
export type IncludesNarrowly<
Source extends string,
  LookFor extends string,
> = And<[IsStringLiteral<Source>, IsStringLiteral<LookFor>]> extends true
  ? Source extends `${string}${LookFor}${string}`
    ? true
    : false
  : never;

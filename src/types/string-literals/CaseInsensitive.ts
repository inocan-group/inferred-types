import { 
  AfterFirst,  
  AsArray,  
  AsString,  
  First, 
  FirstChar,  
  Join,  
  LowerAlphaChar, 
  RemainingChars, 
  Split, 
  Tuple, 
  UpperAlphaChar 
} from "src/types";

/**
 * Make the first character of the string case insensitive which 
 * results in a union type if the first character is alphabetic
 * but remains unchanged if not.
 */
type Insensitive<T extends string> = 
FirstChar<T> extends UpperAlphaChar
  ? `${FirstChar<T>}${RemainingChars<T>}` | `${Lowercase<FirstChar<T>>}${RemainingChars<T>}`
  : FirstChar<T> extends LowerAlphaChar
    ? FirstChar<T> | Uppercase<FirstChar<T>>
    : FirstChar<T>;

/**
 * Process each of the string blocks where each
 * block is typically started with an uppercase
 * character
 */
type ProcessBlock<
  TBlock extends Tuple<string>,
  TResult extends Tuple = []
> = [] extends TBlock
  ? TResult
  : ProcessBlock<
      AfterFirst<TBlock>,
      [...TResult, Insensitive<First<TBlock>>]
    >;

type ProcessElement<
  TContent extends string
> = Join<ProcessBlock<
  Split<Capitalize<AsString<TContent>>, UpperAlphaChar, "retain"> extends readonly string[]
    ? Split<Capitalize<AsString<TContent>>, UpperAlphaChar, "retain">
    : never
>>;

type ProcessEach<
TContent extends readonly string[]
> = {
  [K in keyof TContent]: ProcessElement<TContent[K]>
};

/**
 * **CaseInsensitive**
 * 
 * Receives a string literal (or a Tuple of string literals) and then returns a union
 * type which allows all capital letters to be _upper_ or _lower_ case (as well as 
 * the very first character).
 */
export type CaseInsensitive<
  TContent extends string | readonly string[]
> = TContent extends readonly string[]
? ProcessEach<AsArray<TContent>>
: ProcessElement<AsString<TContent>>;

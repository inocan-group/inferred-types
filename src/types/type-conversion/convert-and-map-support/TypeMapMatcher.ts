
/**
 * **TypeMapMatcher**`<T>`
 * 
 * A tuple which represents the _method_ you will use to match 
 * a type and any necessary and the parameter which fully 
 * qualifies it (where necessary).
 * ```ts
 * const valid1: TypeMatcher<"foobar"> = ["Extends", "foobar"];
 * const valid2: TypeMatcher<boolean> = ["Returns", wide.boolean() ];
 * ```
 */
export type TypeMapMatcher<T = unknown> = 
  | ["Extends", T]
  | ["Equals", T]
  | ["NotEqual", T]
  | ["StartsWith", T & string | number]
  | ["EndsWith", T & string | number]
  | ["Truthy", T]
  | ["Falsy", T]
  | ["Returns", T]
  | ["Any"];

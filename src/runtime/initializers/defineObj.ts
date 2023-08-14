import { ExpandRecursively, SimplifyObject, Narrowable, RemoveIndex } from "src/types";

/**
 * **defineObj**(literal) -> (wide) -> object
 * 
 * A runtime utility designed to create an object _type_ from runtime objects. 
 * The object's keys are all type literals, but the values can be either 
 * _wide_ variants of the value passed in or instead maintain as _narrow_ 
 * a type definition as possible.
 *
 * ### Example
 * ```ts
 * // { foo: 1; bar: number; baz: number }
 * const fooBarBaz = defineObj({foo: 1})({bar: 2, baz: 3});
 * ```
 */
export function defineObj<N extends Narrowable, TLiteral extends Record<string, N>>(
  literal: TLiteral = {} as TLiteral
) {
  /**
   * Add any key/value pairs which you want to have _wide_ types associated;
   * literal types are defined already and stated above.
   */
  return <TWide extends object>(wide: TWide = {} as TWide) => {
    return (
      literal 
        ? { ...wide, ...literal } 
        : wide
      ) as SimplifyObject<RemoveIndex<TLiteral> & ExpandRecursively<RemoveIndex<TWide>>>;
  };
}

import { ExpandRecursively, Narrowable, RemoveIndex, KV, Widen } from "src/types/index";

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
  literal: TLiteral = {} as KV<string> as TLiteral
) {
  /**
   * Add any key/value pairs which you want to have _wide_ types associated;
   * literal types are defined already and stated above.
   */
  return <
    TWide extends KV<string,N>,
  >(wide: TWide = {} as KV as TWide) => {
    return (
      literal 
        ? { ...wide, ...literal } 
        : wide
      ) as unknown as ExpandRecursively<
        RemoveIndex<TLiteral> & 
        Widen<TWide>
      >;
  };
}


import {
  EmptyObject,
  ExpandDictionary,
  IsNonEmptyObject,
  Narrowable,
  RemoveIndex,
  Widen
} from "inferred-types/dist/types/index";

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
export function defineObj<
  N extends Narrowable,
  TLiteral extends Record<string, N>
>(
  literal: TLiteral = {}  as TLiteral
) {
  /**
   * Add any key/value pairs which you want to have _wide_ types associated;
   * literal types are defined already and stated above.
   */
  return <
    N2 extends Narrowable,
    TWide extends Record<string,N2>,
  >(wide: TWide = {} as EmptyObject as TWide) => {
    const obj = (
      literal
        ? { ...literal, ...wide  }
        : wide
    ) as unknown;


    return obj as ExpandDictionary<
      RemoveIndex<TLiteral> & (
        IsNonEmptyObject<TWide> extends true
          ? Widen<TWide>
          : EmptyObject
        )
      >;
  };
};



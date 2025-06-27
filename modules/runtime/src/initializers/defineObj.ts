import type {
    EmptyObject,
    ExpandDictionary,
    IsNonEmptyObject,
    Narrowable,
    RemoveIndex,
    Widen,
} from "inferred-types/types";

/**
 * **defineObj**(literal) -> (wide) -> object
 *
 * A runtime utility designed to create an object **value** who's
 * **type** is defined by the values in the object.
 *
 * The first call to this utility defines _narrow_ type literals, the
 * second call defines _wide_ types of the values passed in.
 *
 * ### Example
 * ```ts
 * // { foo: 1; bar: number; baz: number }
 * const fooBarBaz = defineObj({foo: 1})({bar: 2, baz: 3});
 * ```
 *
 * **Related:** `defineObject`
 */
export function defineObj<
    N extends Narrowable,
    TLiteral extends Record<string, N>,
>(
    literal: TLiteral = {} as TLiteral,
) {
    /**
     * Add any key/value pairs which you want to have _wide_ types associated;
     * literal types are defined already and stated above.
     */
    return <
        N2 extends Narrowable,
        TWide extends Record<string, N2>,
    >(
        wide: TWide = {} as EmptyObject as TWide
    ) => {
        const obj = (
            literal
                ? { ...literal, ...wide }
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

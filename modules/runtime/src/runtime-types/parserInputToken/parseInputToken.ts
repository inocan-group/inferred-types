import {
    Narrowable,
    RuntimeTakeFunction,
    RuntimeType
} from "inferred-types/types";
import { takeAtomicToken } from "inferred-types/runtime";

type Layer = "union" | "intersection" | "anonymous";

/**
 * **parser**`(extractors) -> (parseString, types)`
 *
 * Higher order function which receives:
 *
 * - a number of `RuntimeTakeFunction` functions for parsing duty.
 *
 * Then starts the parsing loop where:
 *
 * - iteratively pulls off segments of this string into
 * `RuntimeType<T,U>`'s until there is nothing left to parse.
 *- if at any point an error occurs this function will return
 * that error rather than continuing.
 */
function parser<const TExtract extends readonly RuntimeTakeFunction[]>(
    ...extract: TExtract
) {

    return <
        const TParse extends string,
        const TTypes extends readonly RuntimeType<TToken, TType>[] | [],
        TToken extends string,
        TType extends Narrowable,
        TLayer extends readonly Layer[] | [] = []
    >(
        parseString: TParse,
        types: TTypes = [] as TTypes,
        layers: TLayer = [] as TLayer
    ) =>  {

    }

}








/**
 * **parseInputToken**`(token) -> RuntimeType<T,U>`
 *
 * A parser for string-based `InputToken`'s which _represent_
 * a discrete _type_ in the type system. The goal is to parse
 * this token into a `RuntimeType<T,U>` where:
 *
 * - `T` is the token (ideally the literal string but wide string
 * if that all we get)
 * - `U` is the _type_ which the token represents
 *
 * This parser will return a `Parse` error if the string passed in
 * is **not** a
 */
export function parseInputToken<
    TToken extends string
>(token: TToken) {
    const result = parser(
        takeAtomicToken,

    )

    (token);
    return result;
}

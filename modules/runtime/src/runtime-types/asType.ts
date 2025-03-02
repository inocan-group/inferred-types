import type {
    AsSimpleType,
    DefineObject,
    FromDefn,
    FromInputToken,
    IT_FunctionLiteralToken,
    IT_ObjectLiteralDefinition,
    IT_TokenSuggest,
    ShapeCallback,
    SimpleScalarToken,
    SimpleToken,
    SimpleType
} from "inferred-types/types";
import { isDefineObject, isFunction } from "inferred-types/runtime";
import { handleDoneFn } from "../api";
import { asDefineObject } from "./asDefineObject";
import { ShapeApiImplementation } from "./shape";

/**
 * **asType**(token)**
 *
 * Converts a `SimpleToken` into it's corresponding _type_.
 *
 * - also allows a `ShapeCallback` for more advanced types
 *    - this includes `DefineObject` key-values
 *    - also allows tuple generation
 * - note: that tokens generated with the callback approach
 * is not fully reverse engineerable at this point; this will
 * be added later
 */
export function asSimpleType<
    T extends [SimpleToken | DefineObject ] | readonly (SimpleToken | DefineObject | ShapeCallback)[],
>(...token: T) {
    return (
        isFunction(token)
            ? token(ShapeApiImplementation)
            : token.length === 1
                ? isFunction(token[0])
                    ? handleDoneFn(token[0](ShapeApiImplementation))
                    : isDefineObject(token[0])
                        ? asDefineObject(token[0])
                        : token[0]
                : token.map(i => isFunction(i) ? handleDoneFn(i(ShapeApiImplementation)) : i)
    ) as unknown as T extends [SimpleToken]
        ? SimpleType<T[0]>
        : T extends [DefineObject]
            ? FromDefn<T[0]>
            : T extends readonly (SimpleToken | DefineObject | ShapeCallback)[]
                ? FromDefn<T>
                : never;
}

export function asStringLiteral<
    T extends readonly SimpleScalarToken[],
>(...values: T) {
    return values.map(i => i as unknown as AsSimpleType<typeof i>);
}


export function asType<
    T extends IT_TokenSuggest
    | IT_FunctionLiteralToken
    | IT_ObjectLiteralDefinition
>(token: T) {
    return token as unknown as FromInputToken<T>;
}

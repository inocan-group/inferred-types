import { If, IsAny, IsNever, Or, IsLiteralObject, IsLiteralScalar } from "inferred-types/types";
import { DefineModifiers, HasModifier } from "types/sets";
import { IsLiteralTuple } from "./IsLiteralTuple";

export type LiteralModifiers = DefineModifiers<[
    "include-boundary",
    "include-any",
    "include-never"
]>;

export type IsLiteral<T, U extends LiteralModifiers = null> = [IsAny<T>] extends [true]
? If<
    Or<[
        HasModifier<"include-any",U,LiteralModifiers>,
        HasModifier<"include-boundary",U,LiteralModifiers>]
    >,
    true,
    false
>
: [IsNever<T>] extends [true]
? If<
    Or<[
        HasModifier<"include-never",U,LiteralModifiers>,
        HasModifier<"include-boundary",U,LiteralModifiers>
    ]>,
    true,
    false
>
: [T] extends [readonly unknown[]]
    ? IsLiteralTuple<T>
: [T] extends [object]
    ? IsLiteralObject<T>
: IsLiteralScalar<T>;


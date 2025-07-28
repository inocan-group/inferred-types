import { DefineModifiers } from "types/sets"

export type LiteralModifiers = DefineModifiers<[
    "include-boundary",
    "include-any",
    "include-never"
]>;

export type IsLiteral<T, U extends null | LiteralModifiers = null> =

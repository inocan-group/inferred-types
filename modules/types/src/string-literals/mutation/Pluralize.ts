import type { PLURAL_EXCEPTIONS } from "inferred-types/constants";
import type {
    IsStringLiteral,
} from "inferred-types/types";

type ExceptionLookup = typeof PLURAL_EXCEPTIONS;
type Consonant = "b" | "c" | "d" | "f" | "g" | "h" | "j" | "k" | "l" | "m" | "n" | "p" | "q" | "r" | "s" | "t" | "v" | "w" | "x" | "y" | "z";

/**
 * Core pluralization logic with optimized direct pattern matching
 */
type _Pluralize<T extends string>
    // Exception lookup - direct check and transform
    = T extends keyof ExceptionLookup
        ? ExceptionLookup[T]
    // Pattern: ends with "is" → add "es"
        : T extends `${infer Head}is`
            ? `${Head}ises`
        // Pattern: ends with "f" → replace with "ves"
            : T extends `${infer Head}f`
                ? `${Head}ves`
            // Pattern: ends with "fe" → replace with "ves"
                : T extends `${infer Head}fe`
                    ? `${Head}ves`
                // Pattern: ends with consonant + "y" → replace "y" with "ies"
                    : T extends `${infer Head}by` ? `${Head}bies`
                    : T extends `${infer Head}cy` ? `${Head}cies`
                    : T extends `${infer Head}dy` ? `${Head}dies`
                    : T extends `${infer Head}fy` ? `${Head}fies`
                    : T extends `${infer Head}gy` ? `${Head}gies`
                    : T extends `${infer Head}hy` ? `${Head}hies`
                    : T extends `${infer Head}jy` ? `${Head}jies`
                    : T extends `${infer Head}ky` ? `${Head}kies`
                    : T extends `${infer Head}ly` ? `${Head}lies`
                    : T extends `${infer Head}my` ? `${Head}mies`
                    : T extends `${infer Head}ny` ? `${Head}nies`
                    : T extends `${infer Head}py` ? `${Head}pies`
                    : T extends `${infer Head}qy` ? `${Head}qies`
                    : T extends `${infer Head}ry` ? `${Head}ries`
                    : T extends `${infer Head}sy` ? `${Head}sies`
                    : T extends `${infer Head}ty` ? `${Head}ties`
                    : T extends `${infer Head}vy` ? `${Head}vies`
                    : T extends `${infer Head}wy` ? `${Head}wies`
                    : T extends `${infer Head}xy` ? `${Head}xies`
                    : T extends `${infer Head}yy` ? `${Head}yies`
                    : T extends `${infer Head}zy` ? `${Head}zies`
                    // Pattern: ends with singular noun endings → add "es"
                        : T extends `${string}${"s" | "sh" | "ch" | "x" | "z" | "o"}`
                            ? `${T}es`
                        // Default: add "s"
                            : `${T}s`;

/**
 * **Pluralize**`<T>`
 *
 * Pluralizes the word `T`, using _language rules_ on pluralization for English as well as
 * leveraging many known exceptions to the linguistic rules.
 */
export type Pluralize<T extends string>
    = IsStringLiteral<T> extends true
        ? T extends `${infer Word} ${infer Rest}`
            ? `${_Pluralize<Word>} ${Rest}`
            : T extends `${infer Word}\t${infer Rest}`
                ? `${_Pluralize<Word>}\t${Rest}`
                : T extends `${infer Word}\n${infer Rest}`
                    ? `${_Pluralize<Word>}\n${Rest}`
                    : _Pluralize<T>
        : string;

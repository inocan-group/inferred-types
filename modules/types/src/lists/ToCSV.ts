import type { AsString, Replace, StripLeading } from "inferred-types/types";

type Process<
    T extends readonly unknown[],
    TReplace extends string,
    TResult extends string = "",
> = T extends [infer Head, ...infer Rest]
    ? Process<
        Rest,
        TReplace,
        Head extends string
            ? `${TResult},${Replace<Head, ",", TReplace>}`
            : `${TResult},${AsString<Head>}`
    >
    : StripLeading<TResult, ",">
;

/**
 * **ToCSV**`<TTuple,[TReplace]>`
 *
 * Converts a tuple into a CSV string. For any elements
 * in the tuple which are strings the `,` character will
 * be replaced with the value of `TReplace` (which defaults
 * to `<comma>`).
 *
 * @deprecated use `ToCsv` instead
 */
export type ToCSV<
    TTuple extends readonly unknown[],
    TReplace extends string = "<comma>",
> = Process<TTuple, TReplace>;

/**
 * **ToCsv**`<TTuple,[TReplace]>`
 *
 * Converts a tuple into a CSV string. For any elements
 * in the tuple which are strings the `,` character will
 * be replaced with the value of `TReplace` (which defaults
 * to `<comma>`).
 */
export type ToCsv<
    TTuple extends readonly unknown[],
    TReplace extends string = "<comma>",
> = Process<TTuple, TReplace>;

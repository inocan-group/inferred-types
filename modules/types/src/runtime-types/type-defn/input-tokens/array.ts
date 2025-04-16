import type {
    AfterLast,
    Err,
    FromStringInputToken,
    Trim,
    Unset,
    UntilLast
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

type Info<T extends string> = {
    type: UntilLast<
        Trim<T>,
        ">",
        {
            handle: Err<`invalid-token/array`, `The array token representation was started with 'Array<' but no closing '>' character was found!`, { token: `Array<${T}` }>
        }
    >,
    rest: AfterLast<Trim<T>, ">" >
};

type Finalize<
    T extends { type: string | Error; rest: string },
    TInner extends readonly any[],
    TContainers extends readonly IT_ContainerType[]
> = T["type"] extends Error
? T["type"]
: T["type"] extends string
    ? FromStringInputToken<
        T["rest"],
        [
            ...TInner,
            // calculate the type of array token
            FromStringInputToken<T["type"]>
        ],
        [ ...TContainers, "Array"]
    >
    : never;

/**
 * pulls an `Array<...>` token from an `InputToken`
 */
export type IT_TakeArray<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `Array<${infer Rest extends string}`
? Finalize<Info<Rest>, TInner, TContainers>
: Unset;



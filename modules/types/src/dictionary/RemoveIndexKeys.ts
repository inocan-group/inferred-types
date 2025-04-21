import { Dictionary } from "inferred-types/types";

type Obj<T> = {
    [K in keyof T as string extends K
        ? never
        : number extends K
            ? never
            : symbol extends K
                ? never
                : K]: T[K]
};

type Arr<T> = {
    [K in keyof T as number extends K
        ? never
        : string extends K
            ? never
            : symbol extends K
                ? never
                : K]: T[K]
}


/**
 * **RemoveIndexKeys**`<T>`
 *
 * Removes _index_ keys which permit key/values to be added to an object while
 * retaining all explicit key/values defined on an object.
 *
 * ```ts
 * type Obj = { [key: string]: unknown; foo: 42 };
 * // { foo: 42 }
 * type Obj2 = RemoveIndexKeys<Obj>;
 * ```
 */
export type RemoveIndexKeys<T> = T extends Dictionary
    ? Obj<T>
    : T extends readonly any[]
        ? Arr<T>
        : never;

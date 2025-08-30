import type { Find, FirstOfEach } from "inferred-types/types";

type ElseOps = "never" | "proxy" | "false" | "true" | "boolean" | "unknown";

type Convert<
    TList extends readonly unknown[],
    TMap extends readonly [from: unknown, to: unknown][],
    TElse,
    TTriggers = FirstOfEach<TMap>
> = {
    [K in keyof TList]: TList[K] extends TTriggers
        ? Find<TMap, "extends", [[TList[K], any]]> extends [any, infer Type]
            ? Type
            : never
        : TElse extends "proxy"
            ? TList[K]
            : TElse extends "false"
                ? false
                : TElse extends "true"
                    ? true
                    : TElse extends "boolean"
                        ? boolean
                        : TElse extends "unknown"
                            ? unknown
                            : TElse extends "never"
                                ? never
                                : never;
};

/**
 * **ArrayTo**`<TList, TMap, [TElse]>`
 *
 * Converts elements of TList which match the _first element_ of `TMap` to the type in the _second element_
 * of `TMap`.
 *
 * - by default items not expressly remapped in `TMap` will by proxied through "as is"
 * - you can optionally, set `TElse` to: `never`, `false`, `true`, `boolean`, or `unknown`
 */
export type ArrayTo<
    TList extends readonly unknown[],
    TMap extends readonly [from: unknown, to: unknown][],
    TElse extends ElseOps = "proxy"
> = Convert<TList, TMap, TElse>;

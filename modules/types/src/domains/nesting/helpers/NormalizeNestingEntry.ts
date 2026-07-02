import type { Nesting, NestingKeyValueConfig } from "inferred-types/types";

export type NormalizeNestingEntry<
    TEntry,
    TFallback extends Nesting
> = TEntry extends readonly [infer Exit extends string, infer Children extends Nesting]
    ? { exit: Exit; children: Children }
    : TEntry extends NestingKeyValueConfig & {
        exit: infer Exit extends string;
        children?: infer Children;
    }
        ? {
            exit: Exit;
            children: Children extends Nesting ? Children : TFallback;
        }
        : TEntry extends string
            ? { exit: TEntry; children: TFallback }
            : never;

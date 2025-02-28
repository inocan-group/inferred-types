import type {
    MergeObjects,
    Narrowable,
    NarrowObject,
} from "inferred-types/types";

/**
 * merge two objects while preserving narrow types
 */
export function mergeObjects<
    TDefault extends NarrowObject<D>,
    TOverride extends NarrowObject<O>,
    D extends Narrowable,
    O extends Narrowable,
>(
    defVal: TDefault,
    override: TOverride,
) {
    return {
        ...defVal,
        ...override,
    } as unknown as MergeObjects<TDefault, TOverride>;
}

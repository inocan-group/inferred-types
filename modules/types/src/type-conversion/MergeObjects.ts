import type {
    Dictionary,
    ExpandDictionary,
} from "inferred-types/types";

/**
 * **MergeObjects**`<TDefault,TOverride>`
 *
 * A type utility that _shallowly merges_ two object types.
 *
 * Properties in TOverride will override properties in TDef.
 * This implementation avoids excessive recursion when dealing with optional properties.
 */
export type MergeObjects<
    TDef extends Dictionary,
    TOverride extends Dictionary,
> = ExpandDictionary<
    // Take all properties from TDef that are not in TOverride
    Omit<TDef, keyof TOverride> &
    // Then add all properties from TOverride
    TOverride
>;

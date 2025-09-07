import type {
    StringSort,
    StringSortOptions
} from "./StringSort";
import type {
    NumericSort,
    NumericSortOptions
} from "./NumericSort";
import type {
    BooleanSort,
    BooleanSortOptions
} from "./BooleanSort";
import type {
    Container,
    Get,
    IsStringLiteral
} from "inferred-types/types";

type SortOrder = "ASC" | "DESC" | "Natural";
type Dotpath = string;


/**
 * **SortOptions**`<[TOrder],[TOffset],[TStart],[TEnd]>`
 *
 * Specifies how you'd like a list sorted.
 */
export type SortOptions = {
    /**
     * the sorting strategy for the list
     *
     * @default "ASC"
     */
    order?: SortOrder;

    /**
     * by adding a `DotPath` to the offset you are expressing that
     * the items in your list are some sort of a container and you'd
     * like the sorting comparison to be done on the offset/index specified.
     *
     * @default undefined
     */
    offset?: Dotpath | undefined;

    /**
     * allows pinning items to the _start_ of the list
     * Can be a single value or array of values
     *
     * @default undefined
     */
    start?: unknown;
    
    /**
     * allows pinning items to the _end_ of the list
     * Can be a single value or array of values
     *
     * @default undefined
     */
    end?: unknown;
};


/**
 * **Sort**`<TList, TOptions>`
 *
 * Sorts an array of values `TList` based on the configuration provided.
 * 
 * Automatically detects the appropriate sort type based on the data:
 * - Pure string arrays use StringSort
 * - Pure number arrays use NumericSort  
 * - Pure boolean arrays use BooleanSort
 * - Container arrays with offset use the type of the offset property
 * - Mixed type arrays fall back to StringSort with type conversion
 *
 * Supports all standard sorting options:
 * - `order`: ASC, DESC, Natural
 * - `start`/`end`: Element pinning
 * - `offset`: Container property sorting
 */
export type Sort<
    TList extends readonly unknown[],
    TOpt extends SortOptions = {}
> = IsStringLiteral<TOpt["offset"]> extends true
    ? TList extends readonly Container[]
        ? TList extends readonly [infer First extends Container, ...any]
            ? Get<First, TOpt["offset"]> extends string
                ? StringSort<TList, TOpt>
                : Get<First, TOpt["offset"]> extends number
                    ? NumericSort<TList, TOpt>
                    : Get<First, TOpt["offset"]> extends boolean
                        ? BooleanSort<TList, TOpt & BooleanSortOptions>
                        : StringSort<TList, TOpt>
            : StringSort<TList, TOpt>
        : StringSort<TList, TOpt>
    : TList extends readonly string[]
        ? StringSort<TList, TOpt>
        : TList extends readonly number[]
            ? NumericSort<TList, TOpt>
            : TList extends readonly boolean[]
                ? BooleanSort<TList, TOpt>
                // Mixed or other types - StringSort can now handle them
                : StringSort<TList, TOpt>;

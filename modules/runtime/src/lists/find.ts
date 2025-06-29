import type {
    Find,
    FromDefn,
    Narrowable,
    ShapeCallback,
    Tuple,
} from "inferred-types/types";
import { isArray, isObject } from "inferred-types/runtime";

/**
 * **Finder**
 *
 * A configured utility designed to find elements in a list.
 */
export type Finder<
    TList extends Tuple,
    TDeref extends string | number | null,
> = <TExtends extends Narrowable | ShapeCallback>(value: TExtends) => Find<
    TList,
    "equals",
    FromDefn<TExtends>,
    TDeref
>;

// TODO: Fix this typing once the runtime types have settled

/**
 * **find**(list, [deref]) => (value) => el | undefined
 *
 * A higher order function that allows _finding_ an element in a list
 * while preserving any available type information.
 */
export function find<
    TList extends Tuple,
    TDeref extends string | number | null = null,
>(
    list: TList,
    deref: TDeref = null as TDeref
) {
    return <
        TExtends extends Narrowable | ShapeCallback,
    >(comparator: TExtends) => {
        return list.find((i: any) => {
            const val: any = deref
                ? isObject(i) || isArray(i)
                    ? (deref as any) in i
                        ? (i as any)[deref]
                        : undefined
                    : i
                : i;
            return val === comparator;
        }) as unknown as Find<TList, "equals", FromDefn<TExtends>, TDeref>;
    };
}

import { Constant } from "inferred-types/constants";

/**
 * **createConstant**(kind)
 *
 * Creates a `Constant<TKind>` type.
 */
function createConstant<TKind extends string>(kind: TKind) {
    return {
        _type: "Constant",
        kind,
    } as Constant<TKind>;
}


export const MARKED = createConstant("Marked");

/**
 * **Marked**
 *
 * A constant that indicates that an item has been marked for
 * some ongoing operation.
 */
export type Marked = typeof MARKED;

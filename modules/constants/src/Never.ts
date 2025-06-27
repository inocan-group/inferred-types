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

/**
 * **Never**
 *
 * A runtime constant that is meant to represent the `never` type.
 *
 * **Related:** you can use the `never()` runtime utility to give a
 * runtime value but force it's type to `never`.
 */
export const Never = createConstant("never") as never;

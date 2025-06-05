import type { Constant } from "inferred-types/constants";

/**
 * **createConstant**(kind)
 *
 * Creates a `Constant<TKind>` type.
 */
export function createConstant<TKind extends string>(kind: TKind) {
    return {
        _type: "Constant",
        kind,
    } as Constant<TKind>;
}

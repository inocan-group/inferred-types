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
 * **NOT_DEFINED**
 *
 * A runtime constant which indicates that some value has not been defined (yet).
 */
export const NOT_DEFINED = createConstant("not-defined");

export type NotDefined = typeof NOT_DEFINED;

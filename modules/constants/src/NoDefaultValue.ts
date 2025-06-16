import { Constant } from "inferred-types/constants";

function createConstant<TKind extends string>(kind: TKind) {
    return {
        _type: "Constant",
        kind,
    } as Constant<TKind>;
}

/**
 * A constant which indicates that a particular
 * type/property was not given a _default value_.
 */
export const NO_DEFAULT_VALUE = createConstant("no-default-value");

/**
 * A unique symbol which indicates that a particular
 * type was not given a "default value".
 */
export type NoDefaultValue = typeof NO_DEFAULT_VALUE;

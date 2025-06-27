import type { If, IsFalse, IsTrue } from "inferred-types/types";
import { isDefined, isFalse, isTrue } from "inferred-types/runtime";
import { addToken } from "./addToken";

export function boolean<L extends boolean>(literal?: L) {
    return (
        isDefined(literal)
            ? isTrue(literal)
                ? addToken("true")
                : isFalse(literal)
                    ? addToken("false")
                    : addToken("boolean")
            : addToken("boolean")
    ) as unknown as If<IsTrue<L>, true, If<IsFalse<L>, false, boolean>>;
}

export const unknown = () => "<<unknown>>" as unknown;

export const undefinedType = () => "<<undefined>>" as unknown as undefined;

export const nullType = () => "<<null>>" as unknown as null;

export const never = () => "<<never>>" as unknown as never;

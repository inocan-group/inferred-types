import { TypedFunction } from "src/base-types";
import { TypedParameter } from "src/functions/TypedParameter";

/**
 * **ExplicitFunction**
 *
 * A function which provides _type_ information to the runtime
 * system about it's name, parameters, and what it returns.
 */
export type ExplicitFunction = TypedFunction & {
    name: string;
    parameters: readonly TypedParameter[];
    returns: unknown;
}

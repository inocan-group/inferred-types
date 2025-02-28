import { isFunction } from "src/type-guards";

export interface AsUnionOptions {
    /** prefix text for runtime type if desired */
    prefix?: string;
    /** postfix text for runtime type if desired */
    postfix?: string;
    /**
     * and encoder to change string representation of each
     * of the elements
     */
    encoder?: ((input: string) => string) | null;
}

const defaultOptions: Required<AsUnionOptions> = {
    prefix: "",
    postfix: "",
    encoder: null,
};

/**
 * Allows you to create a runtime "token" while specifying what it's union type is.
 */
export function asUnion<
    TElements extends readonly N[],
    N extends (string | number | boolean),
    TSep extends string,
    TOpt extends AsUnionOptions,
>(
    /**
     * The elements of a union
     */
    elements: TElements,
    /** the separator to use in runtime type */
    sep: TSep = " | " as TSep,

    options: TOpt = {} as TOpt,
) {
    const opts = {
        ...defaultOptions,
        ...options,
    };

    const encoder = opts.encoder;

    return isFunction(encoder)
        ? `${opts.prefix}${elements.map(i => encoder(`${i}`)).join(sep)}${opts.postfix}` as TElements[number]
        : `${opts.prefix}${elements.join(sep)}${opts.postfix}` as TElements[number];
}

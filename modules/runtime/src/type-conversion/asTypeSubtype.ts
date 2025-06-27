import type { AsTypeSubtype } from "inferred-types/types";

export function asTypeSubtype<T extends string>(input: T) {
    const [type, subtype] = input.split("/");

    return [type, subtype] as AsTypeSubtype<T>;
}

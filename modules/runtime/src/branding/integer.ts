import type { Brand } from "inferred-types/types";

export function integer<T extends number>(num: T): Brand<T, "Integer"> {
    return num as Brand<T, "Integer">;
}

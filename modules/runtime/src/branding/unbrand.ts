import { Narrowable, Unbrand } from "@inferred-types/types";

export function unbrand<T extends Narrowable>(val: T): Unbrand<T> {
    return val as Unbrand<T>;
}

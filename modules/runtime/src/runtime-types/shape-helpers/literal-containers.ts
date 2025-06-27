import type { DictionaryTypeDefn, FromDefn, TupleDefn } from "inferred-types/types";

export function dictionary<T extends DictionaryTypeDefn>(_obj: T) {
    // TODO

    return null as unknown as FromDefn<T>;
}

;
export function tuple<T extends readonly TupleDefn[]>(..._elements: T) {
    // TODO
    return null as unknown as FromDefn<T>;
}

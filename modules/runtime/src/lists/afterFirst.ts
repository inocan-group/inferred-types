import { AfterFirst } from "inferred-types/types";

export function afterFirst<T extends readonly unknown[]>(list: T): AfterFirst<T> {
    return list.slice(1) as AfterFirst<T>;
}

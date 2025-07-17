import { isArray } from "runtime/type-guards";

// TODO: this depends on runtime types which we're not quite there on
export function hasValidComparator(val: unknown) {
    return isArray(val)
}

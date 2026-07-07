import { isArray } from "runtime/type-guards";

// This depends on runtime types which are not fully represented here yet.
export function hasValidComparator(val: unknown) {
    return isArray(val);
}

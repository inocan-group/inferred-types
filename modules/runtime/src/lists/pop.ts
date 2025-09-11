import { BeforeLast, Last } from "inferred-types/types";


/**
 * **pop**`(list) -> [ remaining, popped ]`
 *
 * A utility which takes a list of items and returns a tuple of:
 *
 * - the remaining items after the pop operation
 * - the last item in the list
 *
 * All attempts are made to keep the types literals.
 */
export function pop<T extends readonly unknown[]>(list: T): [ Last<T>, BeforeLast<T>] {
    const before = [...list];
    const last = before.pop();

    return [before, last] as [ Last<T>, BeforeLast<T>]
}

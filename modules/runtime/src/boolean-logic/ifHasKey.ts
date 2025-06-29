import type {
    Container,
    Contains,
    If,
    Keys,
    Narrowable,
} from "inferred-types/types";
import { hasIndexOf } from "inferred-types/runtime";

export function ifHasKey<
    TContainer extends Container,
    TKey extends PropertyKey,
    IF extends Narrowable,
    ELSE extends Narrowable,
>(container: TContainer, key: TKey, hasKey: <V extends TContainer & Record<TKey, unknown>>(val: V) => IF, doesNotHaveKey: <N extends Exclude<TContainer, TKey>>(nonArr: N) => ELSE) {
    return (
        hasIndexOf(container, key)
            ? hasKey(container as TContainer & Record<TKey, unknown>)
            : doesNotHaveKey(container as Exclude<TContainer, TKey>)
    ) as unknown as If<Contains<Keys<TContainer>, TKey>, IF, ELSE>;
}

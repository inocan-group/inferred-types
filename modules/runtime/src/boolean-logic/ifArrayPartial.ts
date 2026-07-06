import type { IsArray, Narrowable } from "inferred-types/types";
import { ifArray } from "inferred-types/runtime";

export function ifArrayPartial<T extends Narrowable>(): <IF extends Narrowable, ELSE extends Narrowable>(isAnArray: <N extends T & readonly unknown[]>(arr: N) => IF, isNotAnArray: <N extends Exclude<T, unknown[] | readonly unknown[]>>(nonArr: N) => ELSE) => <const V extends T>(val: V) => IsArray<V> extends true ? IF : ELSE {
    return <IF extends Narrowable, ELSE extends Narrowable>(
        isAnArray: <N extends T & readonly unknown[]>(arr: N) => IF,
        isNotAnArray: <N extends Exclude<T, unknown[] | readonly unknown[]>>(nonArr: N) => ELSE,
    ) => {
        return <const V extends T>(val: V) => ifArray(val, isAnArray, isNotAnArray);
    };
}

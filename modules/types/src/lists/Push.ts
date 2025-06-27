import type { As } from "../boolean-logic/narrowing/As";

type Process<
    TList extends readonly unknown[],
    TValue,
> = [
    ...TList,
    TValue,
];

/**
 * **Push**`<TList,TVal,[TCondition]>`
 *
 * Pushes a value `TVal` onto an existing list `TList`.
 *
 * - If you want to make the push conditional you can add `TCondition`
 */
export type Push<
    TList extends readonly unknown[] | readonly unknown[][],
    TVal,
    TCondition = true,
> = [TCondition] extends [true]
    ? As<Process<TList, TVal>, readonly unknown[]>
    : TList;

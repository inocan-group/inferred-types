import { If } from "../boolean-logic/branching/If";

type Process<
  TList extends readonly unknown[],
  TValue,
> = [
  ...TList,
  TValue
];


/**
 * **Push**`<TList,TVal,[TCondition]>`
 * 
 * Pushes a value `TVal` onto an existing list `TList`.
 * 
 * - If you want to make the push conditional you can add `TCondition`
 */
export type Push<
  TList extends readonly unknown[], 
  TVal,
  TCondition = true
> = If<
  TCondition,
  Process<TList,TVal>,
  TList
> extends readonly unknown[]
? If<
    TCondition,
    Process<TList,TVal>,
    TList
  >
: never;

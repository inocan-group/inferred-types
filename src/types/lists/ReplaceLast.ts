/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pop } from "src/types";

/**
 * **ReplaceLast**`<TList,TVal>`
 * 
 * Replaces the _last_ element of `TList` with the value of `TVal`.
 */
export type ReplaceLast<
  TList extends readonly any[],
  TVal
> = Pop<TList> extends readonly unknown[]
  ? [...Pop<TList>, TVal]
  : never;

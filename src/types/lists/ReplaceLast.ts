/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExcludeLast } from "./ExcludeLast";

/**
 * **ReplaceLast**`<TList,TVal>`
 * 
 * Replaces the _last_ element of `TList` with the value of `TVal`.
 */
export type ReplaceLast<
  TList extends readonly any[],
  TVal
> = [...ExcludeLast<TList>, TVal];

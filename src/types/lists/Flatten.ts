import { Contains } from "..";
import { AfterFirst, First } from "..";

type _Flat<
  TList extends readonly unknown[],
  TLevel extends 1 | 2 | 3,
  TResults extends readonly unknown[] = []
> = [] extends TList
  ? TLevel extends 1
    ? TResults
    : Contains<TResults, unknown[]> extends true
      ? TLevel extends 3
        ? _Flat<TResults, 2>
        : _Flat<TResults, 1>
      : TResults
  : _Flat<
      AfterFirst<TList>, 
      TLevel,
      First<TList> extends unknown[] | readonly unknown[]
        ? [ ...TResults, ...First<TList>]
        : [ ...TResults, First<TList> ]
    >;

/**
 * **Flatten**`<TList, [TLevel]>`
 * 
 * Flattens the passed in array while preserving strong types.
 * 
 * - by default it will only flatten _one_ level but you may
 * optionally extend this to two or three levels.
 */
export type Flatten<
  TList extends readonly unknown[],
  TLevel extends 1 | 2 | 3 = 1
> = TList extends unknown[]
  ? _Flat<TList, TLevel>
  : TList extends readonly unknown[]
    ? Readonly<_Flat<TList, TLevel>>
    : never;


import { And } from "src/types/boolean-logic";
import { AfterFirst, First } from "src/types/lists";
import { Narrowable } from "src/types/literals";
import { Contains } from "./Contains";

type _Contains<
TList extends readonly unknown[],
THasAll extends Narrowable[],
TResults extends readonly boolean[] = []
> = [] extends THasAll
  ? TResults
  : Contains<TList, First<THasAll>> extends true
    ? _Contains<
      TList,
      AfterFirst<THasAll>,
      [...TResults, true]
    >
    : [false];

/**
  * **ContainsAll**`<TList, THasAll>`
  * 
  * Type utility which provides a boolean response based on 
  * whether the list `TList` contains _all_ of the values passed
  * in.
  * 
  * **Related:** `DoesExtend`, `ContainsSome`
  */
export type ContainsAll<
  TList extends readonly unknown[],
  THasAll extends Narrowable[]
> = And<_Contains<TList, THasAll>>;

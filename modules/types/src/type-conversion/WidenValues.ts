import type { AfterFirst, Container, Dictionary, EmptyObject, First, Keys } from "inferred-types/types";
import type { Widen } from "./Widen";

type ProcessArr<
  T extends readonly unknown[],
> = {
  [K in keyof T]: Widen<T[K]>
};

type ProcessObj<
  TObj extends object,
  TKeys extends readonly (keyof TObj)[],
  TResults extends Dictionary = EmptyObject,
> = [] extends TKeys
  ? TResults
  : ProcessObj<
    TObj,
    AfterFirst<TKeys>,
    TResults & Record<First<TKeys>, TObj[First<TKeys>]>
  >;

/**
 * **WidenValues**`<T>`
 *
 * Type utility which _widens_ the values of a container.
 *
 * **Related:** `Widen`
 */
export type WidenValues<
  T extends Container,
> = T extends readonly unknown[]
  ? ProcessArr<T>
  : T extends Dictionary
    ? ProcessObj<T, Keys<T> extends readonly (keyof T)[] ? Keys<T> : never>
    : never;

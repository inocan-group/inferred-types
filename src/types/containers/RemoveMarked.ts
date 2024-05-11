import { MARKED } from "src/constants/index";
import { Container, EmptyObject, KV, ObjectKey, Tuple } from "../base-types";
import { RemoveIndexKeys } from "../dictionary/RemoveIndexKeys";
import { NumericKeys } from "../lists";
import { AfterFirst } from "../lists/AfterFirst";
import { First } from "../lists/First";
import { UnionToTuple } from "../type-conversion/UnionToTuple";
import { DoesExtend } from "../boolean-logic/operators/DoesExtend";
import { If } from "../boolean-logic/branching/If";

type Marked = typeof MARKED;

type _Keys<T extends object> = UnionToTuple<keyof RemoveIndexKeys<T>> extends 
readonly ObjectKey[]
  ? UnionToTuple<keyof RemoveIndexKeys<T>>
  : never;

type Process<
  T extends Container,
  TKeys extends readonly PropertyKey[],
  TResults extends Container = T extends readonly unknown[] ? [] : EmptyObject
> = [] extends TKeys
? TResults
: First<TKeys> extends keyof T
  ? If<
      DoesExtend<T[First<TKeys>], Marked>,
      Process<T,AfterFirst<TKeys>, TResults>,
      Process<
        T,
        AfterFirst<TKeys>,
        First<TKeys> extends keyof T
          ? TResults extends readonly unknown[] 
            ? [...TResults, T[First<TKeys>]]
            : TResults extends KV
              ? TResults & Record<First<TKeys>, T[First<TKeys>]>
              : never
          : never
      >
    >
  : never

/**
 * **RemoveMarked**`<T>`
 * 
 * Removes all values in `T` which extends `Constant<"Marked">`
 */
export type RemoveMarked<
  T extends Container
> = Process<
  T,
  T extends Tuple ? NumericKeys<T> :  _Keys<T>
>

import { Container, EmptyObject, Dictionary, ObjectKey, Tuple } from "../base-types";
import { IsUndefined } from "../boolean-logic/operators/IsUndefined";
import { RemoveIndexKeys } from "../dictionary/RemoveIndexKeys";
import { NumericKeys } from "../lists";
import { AfterFirst } from "../lists/AfterFirst";
import { First } from "../lists/First";
import { UnionToTuple } from "../type-conversion/UnionToTuple";

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
  ? 
      IsUndefined<T[First<TKeys>]> extends true
      ? Process<T,AfterFirst<TKeys>, TResults>
      : Process<
        T,
        AfterFirst<TKeys>,
        First<TKeys> extends keyof T
          ? TResults extends readonly unknown[] 
            ? [...TResults, T[First<TKeys>]]
            : TResults extends Dictionary
              ? TResults & Record<First<TKeys>, T[First<TKeys>]>
              : never
          : never
      >
  : never


/**
 * **RemoveUndefined**`<T>`
 * 
 * Removes all the elements from `T` which are typed as _undefined_.
 */
export type RemoveUndefined<
  T extends Container
> = Process<
  T,
  T extends Tuple ? NumericKeys<T> :  _Keys<T>
>

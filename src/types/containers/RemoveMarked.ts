import { MARKED } from "src/constants/index";
import { 
  DoesExtend, 
  UnionToTuple, 
  First, 
  AfterFirst, 
  NumericKeys,
  RemoveIndexKeys,
  Container, EmptyObject, Dictionary, ObjectKey, Tuple
} from "src/types/index";


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
  ? DoesExtend<T[First<TKeys>], Marked> extends true
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

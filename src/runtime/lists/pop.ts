import { First, IfLength, IfUnion, Length, Narrowable, Pop, Tuple, UnionToTuple } from "src/types";
import { ifArray } from "../boolean-logic";
import { createFnWithProps } from "../functions";
import { asArray } from "./asArray";
import { last } from "./last";

/**
 * **pop**(list) => () => el
 * 
 * A higher order function which receives a list and the allows
 * items to be popped off of it (aka, taken from end of stack).
 * 
 * **Related:** `shift`
 */
export const pop = <
  N extends Narrowable,
  K extends PropertyKey,
  T extends readonly (Record<K,N> | Narrowable)[]
>(...values: T) => {
  const data = (
    values.length === 1 
      ? values[0] 
      : values
  ) as Length<T> extends 1 
    ? T[0] extends readonly unknown[]
      ? T[0] extends infer Arr
        ? IfUnion<
            First<Arr & readonly unknown[]>, 
            UnionToTuple<First<T[0]>>, 
            T[0]
          >
        : T[0]
      : T[0]
    : T;

  return provide(asArray(data));
};

const provide = <T extends Tuple>(tuple: T) => {
  const fn = () => {
    const val = last(tuple);
    const rest = tuple.slice(0,-1);

  };
  const api = createFnWithProps(fn)({tuple});
  return api;
};


const a = pop([1,2,3]);
const b = pop(1,2,3);
const c = pop(1);
const d = b.tuple.slice(0,-1);


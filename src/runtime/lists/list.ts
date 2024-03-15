import { Contains } from "src/types/boolean-logic";
import { Narrowable } from "src/types/literals";

type Narrow = Exclude<Narrowable, symbol>;

export type List<
  TName extends string,
  TState extends readonly Narrow[]
> = {
  name: TName;
  values: TState;
  add: <A extends Narrow>(item: A) => List<TName, [...TState,A]>;
  has: <A extends Narrow>(item: A) => Contains<TState, A>;
}


const api = <
  TName extends string,
  TState extends readonly Narrow[],
>(name: TName, state: TState) => ({
  values: state,
  add: <A extends Narrow>(item: A) => api([...state, item]),
  has: <A extends Narrow>(item: A) => state.includes(item) as Contains<TState,A>
} as List<TName, TState>)

export const list = <
  TName extends string
>(name: TName): List<TName, []> => {
  return api(name, [])
}


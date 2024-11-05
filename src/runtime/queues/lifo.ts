import { FixedLengthArray, LifoQueue, Narrowable } from "inferred-types/dist/types/index";


const queue =  <
  T extends unknown[],
>(state: T): LifoQueue<T[number]> => ({
  queue: state,
  size: state.length,
  isEmpty() {
    return state.length === 0
  },
  push(...add) {
    state.push(...add);
  },
  drop(quantity) {
    state.splice(-quantity!);
  },
  clear() {
    state.slice(0,0)
  },
  drain() {
    const old_state = [...state];
    state.slice(0,0);
    return old_state;
  },
  take<Q extends number | undefined>(quantity?: Q) {
    const result = state.slice(-quantity!);
    state.splice(-quantity!);
    return result as FixedLengthArray<T[number], Q extends undefined ? 1 : Q>;
  },
  [Symbol.iterator]: function* () {
    for (let i = state.length - 1; i >= 0; i--) {
      yield state[i] as T[number];
    }
  }
})


export const createLifoQueue = <
  T extends readonly K[],
  K extends Narrowable
>(...list: T) => {

  return queue([...list]);
}

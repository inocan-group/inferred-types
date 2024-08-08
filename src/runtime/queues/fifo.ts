import { FifoQueue, FixedLengthArray, LifoQueue, Narrowable } from "src/types/index";


const queue =  <
  T extends unknown[],
>(state: T): FifoQueue<T[number]> => ({
  queue: state,
  size: state.length,
  isEmpty() {
    return state.length === 0
  },
  clear() {
    state.slice(0,0)
  },
  drain() {
    const old_state = [...state];
    state.slice(0,0);
    return old_state;
  },
  push(...add) {
    state.push(...add);
  },
  drop(quantity) {
    if (quantity && quantity > state.length) {
      throw new Error('Cannot drop more elements than present in the queue');
    }
    state.splice(0, quantity || 1);
  },
  take<Q extends number | undefined>(quantity?: Q) {
    if (quantity && quantity > state.length) {
      throw new Error('Cannot take more elements than present in the queue');
    }
    const result = state.slice(0, quantity || 1);
    state.splice(0, quantity || 1);
    return result as FixedLengthArray<T[number], Q extends undefined ? 1 : Q>;
  },
  [Symbol.iterator]: function* () {
    for (let i = 0; i < state.length; i++) {
      yield state[i] as T[number];
    }
  }
})


export const createFifoQueue = <
  T extends readonly K[],
  K extends Narrowable
>(...list: T) => {

  return queue([...list]);
}

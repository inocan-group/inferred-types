import { Tuple } from "inferred-types/dist/types/index";


/**
 * **PromiseAll**
 *
 *
 */
export interface PromiseAll<TKind = unknown> {
  <T extends Tuple<PromiseLike<TKind>>>(...promises: T): {
    [K in keyof T]: Awaited<T[K]>
  };
}

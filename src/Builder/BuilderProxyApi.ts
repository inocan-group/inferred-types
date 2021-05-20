import { MutationIdentity } from "~/Mutation";
import { TypeGuard, MutationApi } from "~/Builder";

export type BuilderProxyApi<
  /** The configuration _state_ being built */
  S extends object,
  /**
   * Incoming state-aware mutation API
   */
  A extends MutationApi<{ [key: string]: MutationIdentity<Partial<S>, any> }>,
  /** The properties of the API which are being excluded from the */
  E extends string & keyof A = "",
  /** Whether or not the builder is _done_ configuring the "state" */
  D extends boolean = false
> = D extends true ? Omit<A, E> & { unwrap(): S } : Omit<A, E>;

/**
 * A builder's exposed API to consumers
 */
export function BuilderProxyApi<TState extends object>(
  state: Partial<TState>,
  validate: TypeGuard<TState>
) {
  return <TApi extends MutationApi<{ [key: string]: MutationIdentity<Partial<TState>, any> }>>(
    // Mutation API
    api: TApi
  ) => {
    // const proxy = new Proxy(api, {
    //   apply:
    // });

    return validate(state) ? { ...api, unwrap: () => state } : api;
  };
}

// export type IdentityTuple<K extends string, F extends > =

import { ExclusionSet } from "./ExclusionSet";

export type ExclusionSet<T extends { [K in keyof T]: true }> = T;

export type IdentityFunction<T extends object, TStart extends Partial<T>, TEnd extends Partial<T>, P extends any[]> = (s: TStart) => (m: P) => TEnd;

export type IdentityTuple<K extends string, F extends IdentityFunction<any, any, any, any>, E extends string> = [K, F, E];


/**
 * Produces an `IdentityTuple` which fully represents the type information
 * required for defining this identity function into an API destined for a
 * fluent API after transformation.
 */
export function IdentityFunction<S extends object, K extends Readonly<string>, F extends MutatationIdentity<any, any>>(name: K, fn: MutationIdentity, exclude: string[]) {
  return [name, fn];
}

const rules = ExclusionSet({ foo: true, bar: true });


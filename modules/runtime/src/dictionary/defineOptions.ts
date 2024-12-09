import {
  Dictionary,
  KeyOf,
  MakeKeysOptional,
  MakeKeysRequired,
  RequiredKeys,
} from "inferred-types/types"
import {
  createFnWithProps,
} from "inferred-types/runtime"


export type UserOptions<
  TDefn extends Dictionary,
  TReq extends ((string|symbol) & keyof TDefn)
> = TReq extends ""
? <
    T extends Partial<TDefn>,
    R extends TDefn
  >(opt?: T) => R & { param: MakeKeysRequired<Partial<TDefn>, TReq> }
: TReq extends readonly (keyof TDefn)[]
? <
    T extends MakeKeysRequired<Partial<TDefn>, TReq>,
    R extends TDefn
  >(opt: T) => R & { param: MakeKeysRequired<Partial<TDefn>, TReq> }
: never;


export type AsUserOptions<
  TDefn extends Dictionary,
  _TDefaults extends Partial<TDefn>
> = UserOptions<
TDefn,
RequiredKeys<TDefn>
>;

const _userOptions = <
  TDefn extends Dictionary,
  TDefaults extends Partial<TDefn>
>(def_values: TDefaults) => createFnWithProps(
  <T extends KeyOf<TDefaults> extends ""
    ? TDefn
    : MakeKeysOptional<TDefn, KeyOf<TDefaults>>>(opt: T) => {
    return {
      ...def_values,
      opt
    } as unknown as TDefn & TDefaults & T
  },
  { param: null as unknown as MakeKeysOptional<TDefn, KeyOf<TDefaults>> }
);

/**
 * **defineOptions**`<T>(def_values?: () => { .. }) → UserOptions<T, TReq>`
 *
 * Defines:
 *   1. a set of options,
 *   2. allows default values to be assigned,
 *   3. then provides
 * a type for user input which makes all properties that were optional or have
 * a default value be optional while also providing a type-strong merge function
 * to merge in their results.
 * ```ts
 * // {
 * //    userOptions: {width?: number; height: number}},
 * //    merge<U>(user: U) => T
 * // }
 * const opts = defineOptions<{width: number; height: number}() => ({width: 640});
 * ```
 */
// export const defineOptions = <
//   T extends Dictionary
// >(a: ({defaults: (<D extends Partial<T>>() => D)): void) => {

//   return userOptions(cb());
// };








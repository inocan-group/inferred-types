import type {
  AnyObject,
  ConstrainedObjectCallback,
  ConstrainedObjectIdentity,
  ConstrainObject,
  DefineObject,
  FromDefineObject,
  Narrowable,
} from "inferred-types/types";
import { createFnWithPropsExplicit } from "inferred-types/runtime";

function callback<Constraint extends AnyObject>(): ConstrainedObjectCallback<Constraint> {
  return <TReturn>(
    cb: (input: ConstrainObject<Constraint, Constraint>) => TReturn,
  ): ((input: ConstrainObject<Constraint, Constraint>) => TReturn) => {
    return input => cb(input);
  };
}

function narrowFn<TDefn extends AnyObject>() {
  const fn = <
    T extends Record<string, N>,
    N extends Narrowable,
    Constraint extends TDefn,
  >(
    obj: T & ConstrainObject<T, Constraint>,
  ) => obj;

  return fn as ConstrainedObjectIdentity<TDefn>;
}

/**
 * **narrowObjectTo**`(constraint) => (obj) => obj
 *
 * Ensures that this identity function extracts a narrow type
 * definition from whatever is passed into `obj` while ensuring
 * that `obj` conform to the broader type definition `constraint`.
 *
 * ```ts
 * const fn = narrowObjectTo({foo: "string", bar: "Opt<number>"});
 * // {foo: "foo"; bar: 42}
 * const obj = fn({foo: "foo", bar: 42});
 * ```
 *
 * **Related:** `ConstrainedObjectIdentity`, `narrowObjectToType`
 */
export function narrowObjectTo<
  TDefn extends DefineObject,
>(_defn: TDefn): ConstrainedObjectIdentity<FromDefineObject<TDefn>> {
  return createFnWithPropsExplicit(
    narrowFn<FromDefineObject<TDefn>>(),
    {
      asCallback: callback<TDefn>(),
    },
  );
}

/**
 * **narrowObjectToType**`<Constraint>() => (obj) => obj
 *
 * Ensures that this identity function extracts a narrow type
 * definition from whatever is passed into `obj` while ensuring
 * that `obj` conform to the broader type definition `constraint`.
 *
 * ```ts
 * const fn = narrowObjectToType<{foo: "string", bar: "Opt<number>"}>();
 * // {foo: "foo"; bar: 42}
 * const obj = fn({foo: "foo", bar: 42});
 * ```
 *
 * **Related:** `ConstrainedObjectIdentity`, `narrowObjectTo`
 */
export function narrowObjectToType<TDefn extends AnyObject>(): ConstrainedObjectIdentity<TDefn> {
  return createFnWithPropsExplicit(
    narrowFn<TDefn>(),
    {
      asCallback: callback<TDefn>(),
    },
  );
}

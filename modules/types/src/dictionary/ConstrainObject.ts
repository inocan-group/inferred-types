import type {
  AnyObject,
  As,
  ExpandDictionary,
  Filter,
  Keys,
  Narrowable,
  ObjectKey,
  RequiredKeysTuple,
} from "inferred-types/types";

type HasRequiredKeys<
  TObj extends readonly ObjectKey[],
  TConstraint extends readonly ObjectKey[],
> = Filter<TConstraint, TObj[number]>["length"] extends 0
  ? true
  : false;

/**
 * Helper type to infer narrow types while constraining to a broad type.
 */
export type ConstrainObject<
  TObj extends AnyObject,
  TConstraint extends AnyObject,
> = HasRequiredKeys<
  As<Keys<TObj>, readonly ObjectKey[]>,
  RequiredKeysTuple<TConstraint>
> extends true
  ? {
      [K in keyof TObj]: K extends keyof TConstraint
        ? TObj[K] & TConstraint[K]
        : never;
    }
  : TConstraint

;

/**
 * A function which will accept any object that meets the
 * defined constraint and will extract a narrow type from it.
 *
 * **Related:** `narrowObjectTo`
 */
export type ConstrainedObjectIdentity<
  Constraint extends AnyObject,
> = (
  <
    T extends Record<string, N>,
    N extends Narrowable,
    TConstraint extends Constraint,
  >(
    obj: T & ConstrainObject<T, TConstraint>
  ) => ExpandDictionary<T>
) & (
  {
    cb: <
      TCb extends (obj: ReturnType<ConstrainedObjectIdentity<Constraint>>) => unknown,
    >(cb: TCb
    ) => ReturnType<TCb>;
  }
);

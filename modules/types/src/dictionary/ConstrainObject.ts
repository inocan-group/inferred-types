import type {
  AnyObject,
  ExpandDictionary,
  Narrowable,
} from "inferred-types/types";

/**
 * Helper type to infer narrow types while constraining to a broad type.
 */
export type ConstrainObject<
  TObj,
  TConstraint,
> = {
  [K in keyof TObj]: K extends keyof TConstraint ? TObj[K] & TConstraint[K] : never;
};

/**
 * A function which will accept any object that meets the
 * defined constraint and will extract a narrow type from it.
 *
 * **Related:** `narrowObjectTo`
 */
export type ConstrainedObjectIdentity<
  Constraint extends AnyObject,
> = <
  T extends Record<string, N>,
  N extends Narrowable,
  TConstraint extends Constraint,
>(obj: T & ConstrainObject<T, TConstraint>
) => ExpandDictionary<T>;

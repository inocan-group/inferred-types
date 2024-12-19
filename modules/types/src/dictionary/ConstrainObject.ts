import type {
  AnyObject,
  Narrowable,
} from "inferred-types/types";

/**
 * Helper type to infer narrow types while constraining to a broad type.
 */
export type ConstrainObject<
  TObj extends AnyObject,
  TConstraint extends AnyObject,
> = {
  [K in keyof TConstraint]: K extends keyof TObj ? TObj[K] & TConstraint[K] : never;
};

export type ConstrainedObjectCallback<
  TConstraint extends AnyObject,
> = <TReturn extends Narrowable>(
  cb: (input: ConstrainObject<TConstraint, TConstraint>) => TReturn
) => (input: ConstrainObject<TConstraint, TConstraint>) => TReturn;

/**
 * A function which will accept any object that meets the
 * defined constraint and will extract a narrow type from it.
 *
 * **Related:** `narrowObjectTo`
 */
export interface ConstrainedObjectIdentity<TConstraint extends AnyObject> {
  <T extends TConstraint>(
    input: T & ConstrainObject<T, TConstraint>
  ): T;
  asCallback: ConstrainedObjectCallback<TConstraint>;
}

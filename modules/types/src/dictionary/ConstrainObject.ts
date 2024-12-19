import type {
  AnyObject,
  As,
  ContainsAll,
  ExpandDictionary,
  Filter,
  IsOptional,
  Keys,
  Narrowable,
  ObjectKey,
  RequiredKeys,
  RequiredKeysTuple,
  SetKeysTo,
} from "inferred-types/types";


type HasRequiredKeys<
  TObj extends readonly ObjectKey[],
  TConstraint extends readonly ObjectKey[]
> = Filter<TConstraint, TObj[number]>["length"] extends 0
  ? true
  : false;

type MissingKeys<
  TObj extends AnyObject,
  TConstraint extends AnyObject
> = Filter<
  RequiredKeysTuple<TConstraint>,
  keyof TObj
> ;

type X = RequiredKeysTuple<{foo: string; bar?: number}>;
type Y = As<Keys<{bar: 23}>, readonly ObjectKey[]>;

type Z = MissingKeys<{bar: 23}, {foo: string; bar?: number}>;

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

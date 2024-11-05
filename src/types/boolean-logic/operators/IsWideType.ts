
import {
  Container,
  ErrorCondition,
  IsEqual,
  IsNever,
  IsVueRef,
  IsWideUnion,
  ObjectKey,
  ProxyError,
  RemoveIndexKeys,
  Scalar,
  Throw,
  UnionToTuple,
} from "inferred-types/dist/types/index";

/**
 * **IsWideScalar**`<T>`
 *
 * Boolean operator which validates whether or not `T`
 * is considered a "wide type" which extends `Scalar`
 */
export type IsWideScalar<T> = [T] extends [Scalar]
  ? [
      IsEqual<T, string, true,false>,
      IsEqual<T, number, true,false>,
      IsEqual<T, boolean, true,false>,
      IsEqual<T, null, true,false>,
      IsEqual<T, symbol, true,false>,
    ] extends [
      false, false, false, false, false
    ]
      ? false
      : true
: false;

type _Keys<
  T extends object
  > = UnionToTuple<keyof RemoveIndexKeys<T>>;

type GetKeys<
  T extends object
> = IsVueRef<T> extends true
? ["value"]
: _Keys<T> extends [symbol]
  ? ObjectKey[]
  : _Keys<T> extends []
    ? UnionToTuple<keyof T> extends [ObjectKey]
      ? (keyof T)[]
      : ObjectKey[]
    : _Keys<T>;


/**
 * **IsWideContainer**`<T>`
 *
 * Boolean operator which tests wether `T` is a `Container` and
 * also a `wide type` (aka, not a literal).
 */
export type IsWideContainer<T> = T extends Container
? T extends readonly unknown[]
  ? "length" extends keyof T
    ? IsEqual<T["length"], number> extends true
      ? true
      : false
    : false
  : T extends object
    ? "length" extends keyof GetKeys<T>
      ? IsEqual<GetKeys<T>["length"], number> extends true
        ? true
        : false
      : false
    : false
: false;



type InvalidNever = Throw<
  "invalid-never",
  `The value of T when calling IsWideType<T> was "never" which makes the comparison invalid! If you want prefer to instead allow this condition then set the TNever generic to true or false depending on your preferred outcome`,
  "IsWideType",
  { library: "inferred-types"}
>

/**
 * **IsWideType**`<T, [TNever]>`
 *
 * Identifies types which are "wide" (and have a narrow variant):
 *
 * - string, number, and boolean types
 * - `string[]`, `number[]` array types
 * - wide union types like `string | number`
 *
 * **Note:**
 * - types such as `null` and `undefined` **are** considered wide.
 * - If the `T` passed in is _never_ the result of this operation is
 * ErrorCondition<"invalid-never"> but this can be made into whatever
 * you like by setting the `TNever` generic.
 * - If an ErrorCondition is in `T` then it will be bubbled up
 */
export type IsWideType<
  T,
  TNever = InvalidNever
> = [IsNever<T>] extends [true]
? TNever
: [T] extends [ErrorCondition]
? ProxyError<T,"IsWideType">
:IsWideScalar<T> extends true
? true
: IsWideContainer<T> extends true
? true
: IsWideUnion<T> extends true
? true
: false;



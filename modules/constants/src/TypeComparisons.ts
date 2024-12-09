import { WideAssignment } from "./Wide";

type Scalar = string | number | boolean | null | symbol;
type WideApi = typeof WideAssignment;
const wide = WideAssignment as unknown as WideApi;

function entry<
  TRefType extends ((kb: WideApi) => unknown),
  TDesc extends string,
  TParams extends readonly (Scalar | ((kb: WideApi) => unknown))[],
>(refType: TRefType, desc: TDesc, ...params: TParams) {
  return [
    refType(wide as unknown as WideApi) as ReturnType<TRefType>,
    desc as TDesc,
    params.map(i => typeof (i) === "function"
      ? i(wide)
      : i,
    ) as unknown as TParams,
  ] as [ReturnType<TRefType>, TDesc, TParams];
}

/**
 * **TYPE_COMPARISONS**
 *
 * A dictionary of all _comparison_ operations along with their `RefType`, description,
 * and `Params`.
 */
export const TYPE_COMPARISONS = {
  Extends: entry(t => t.unknown(), "extends the type", t => t.unknown()),
  NotExtends: entry(t => t.unknown(), "does not extent the type", t => t.unknown()),
  Equals: entry(t => t.unknown(), "equals the type", t => t.unknown()),
  NotEqual: entry(t => t.unknown(), "does not equal the type", t => t.unknown()),
  Truthy: entry(t => t.unknown(), "must be a truthy value"),
  Falsy: entry(t => t.unknown(), "must be a falsy value"),
  IsSomething: entry(t => t.unknown(), "must be 'something' (aka, not null or undefined)"),
  IsNothing: entry(t => t.unknown(), "must be 'nothing' (aka, null or undefined)"),
  IsString: entry(t => t.string(), "must extend a string type"),
  IsNumber: entry(t => t.number(), "must extend a number type"),
  IsBoolean: entry(t => t.boolean(), "must extend a boolean type"),
  // numeric
  GreaterThan: entry(t => t.number(), "must be a numeric literal greater than [[0]]", t => t.number()),
  LessThan: entry(t => t.number(), "must be a numeric literal less than [[0]]", t => t.number()),
  // string
  StartsWith: entry(t => t.string(), "must be a string literal that starts with '[[0]]'", t => t.string()),
  EndsWith: entry(t => t.string(), "must be a string literal that ends with '[[0]]'", t => t.string()),
  Includes: entry(t => t.string(), "must be a string literal that includes the substring '[[0]]'", t => t.string()),
  // function
  ReturnsSomething: entry(t => t.function(), "must be a function which returns 'something' (aka, not null or undefined)"),
  ReturnsNothing: entry(t => t.function(), "must be a function which returns 'nothing' (aka, null or undefined)"),
  ReturnsTrue: entry(t => t.function(), "must be a function which returns 'true'"),
  ReturnsFalse: entry(t => t.function(), "must be a function which returns 'false'"),
  ReturnsTruthy: entry(t => t.function(), "must be a function which returns a 'truthy' value"),
  ReturnsFalsy: entry(t => t.function(), "must be a function which returns a 'falsy' value"),
  ReturnsExtends: entry(t => t.unknown(), "must be a function which returns a value which extends [[0]]", t => t.unknown()),
  ReturnsEquals: entry(t => t.unknown(), "must be a function which returns a value which equals [[0]]", t => t.unknown()),
  Contains: entry(t => t.tuple(), "must be a tuple and have elements that extends the value [[0]]", t => t.unknown()),
  // TODO: get the below working`
  ContainsSome: entry(t => t.tuple(), "must be a tuple and have elements that extends the value [[0]]", t => t.singularTuple()),

} as const;

/* eslint-disable no-use-before-define */
import { Narrowable } from "src/types/Narrowable";
import {  DoesExtend, IfArray, IfEquals, IfExtends, IfFalse, IfOr, IfStringLiteral, IsEqual, IsUnion } from "../boolean-logic";
import { TupleToUnion } from "../type-conversion/TupleToUnion";
import { TypeGuard } from "../TypeGuard";
import { TupleFilter } from "../lists/TupleFilter";
import {  TypeKvToObject, UnionToIntersection } from "../type-conversion";
import { Box } from "src/runtime/literals/box";
import { AnyFunction } from "../functions/function-types";
import { NotApplicable } from "../constants/NotApplicable";
import { NoDefaultValue } from "../constants";

export const FALSY_TYPE_KINDS = [
  "undefined", "null",
] as const;

export const LITERAL_TYPE_KINDS = [
  "true", "false", "stringLiteral", "numericLiteral",
] as const;

export const WIDE_TYPE_KINDS = [
  "string", "number", "boolean",
] as const;

export const NARROW_CONTAINER_TYPE_KINDS = [
  "object", "explicitFunctions", "fnType", "fnWithDict",  "tuple", 
  "union", "intersection", "arrayOf"
] as const;

export const WIDE_CONTAINER_TYPE_KINDS = [
  "anyArray", "anyObject", "unknownObject", "anyFunction", "emptyObject"
] as const;

export type TypeOptions<
  TKind extends TypeKind, 
  TRequired extends boolean = boolean,
  TDesc extends string = string,
  TUnderlying extends TypeUnderlying = TypeUnderlying,
  TDefaultValue extends TypeDefaultValue<TKind,TRequired,TUnderlying> = TypeDefaultValue<TKind,TRequired,TUnderlying>,
  TValidations extends readonly any[] | "no-validations" = readonly any[] | "no-validations", 
> = {
  isRequired?: TRequired;
  validations?: TValidations;
  defaultValue?: TDefaultValue;
  description?: TDesc;
};


/**
 * A full list of the _types_ of types we have within the `Type` namespace.
 */
export const TYPE_KINDS = [
  FALSY_TYPE_KINDS,
  WIDE_TYPE_KINDS,
  LITERAL_TYPE_KINDS,
  NARROW_CONTAINER_TYPE_KINDS,
  WIDE_CONTAINER_TYPE_KINDS
] as const;

export type TypeKindLiteral = Readonly<TupleToUnion<typeof LITERAL_TYPE_KINDS>>;
export type TypeKindWide = Readonly<TupleToUnion<typeof WIDE_TYPE_KINDS>>;
export type TypeKindFalsy = Readonly<TupleToUnion<typeof FALSY_TYPE_KINDS>>;
export type TypeKindContainerNarrow = Readonly<TupleToUnion<typeof NARROW_CONTAINER_TYPE_KINDS>>;
export type TypeKindContainerWide = Readonly<TupleToUnion<typeof WIDE_CONTAINER_TYPE_KINDS>>;
export type TypeKindContainer = TypeKindContainerNarrow | TypeKindContainerWide;

/**
 * A union of all the _types_ of types we have within the `Type` namespace.
 */
export type TypeKind = TypeKindLiteral | TypeKindWide | TypeKindFalsy | TypeKindContainer;

export type TypeIsRequired = "required" | "not-required";

/**
 * **IsLiteralKind**`<T>`
 * 
 * Type utility which checks whether a given `TypeKind` maps to
 * a narrow / literal type.
 */
export type IsLiteralKind<T extends TypeKind> = IfOr<
  [
    IfExtends<T, TypeKindLiteral, true, false>,
    IfExtends<T, TypeKindContainerNarrow, true, false>,
  ],
  true,
  false
>;

export type IfLiteralKind<
  T extends TypeKind,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsLiteralKind<T> extends true ? IF : ELSE;

/**
 * **ToType**
 * 
 * A type utility which takes a runtime type's "kind", whether it's
 * required or not, and any _underlying_ values and produces the 
 * Typescript type.
 * 
 * Note: because `Type` and `TypeDefn` have slightly different representations
 * of TRequired and TUnderlying, we will accept either and convert.
 */
type ToType<
  TKind extends TypeKind, 
  TRequired extends boolean | TypeIsRequired = boolean | TypeIsRequired,
  TUnderlying extends TypeUnderlying = "no-underlying"
> = IfOr<
      [DoesExtend<TRequired, "not-required">, DoesExtend<TRequired, false>], ToBaseType<TKind,  TUnderlying> | undefined,
      ToBaseType<TKind,  TUnderlying>
    >;

type ToBaseType<
  TKind extends TypeKind, 
  TUnderlying extends TypeUnderlying = "no-underlying"
> = //
  TKind extends "string" ? string
  : TKind extends "number" ? number
  : TKind extends "boolean" ? boolean
  : TKind extends "null" ? null
  : TKind extends "undefined" ? undefined
  : TKind extends "stringLiteral" ? TupleToUnion<TUnderlying>
  : TKind extends "numericLiteral" ? TupleToUnion<TUnderlying>
  : TKind extends "true" ? true
  : TKind extends "false" ? false
  : TKind extends "anyArray" ? any[]
  : TKind extends "anyObject" ? Record<string, any>
  : TKind extends "unknownObject" ? Record<string, unknown>
  : TKind extends "anyFunction" ? AnyFunction
  : TKind extends "anyObject" ? Record<string, any>
  : TKind extends "fnWithDict" ? 
      TUnderlying extends readonly [
        {kind: "fnType"; type: any; [key: string]: any}, 
        {kind: "object"; type: any; [key: string]: any}
      ]
        ? TUnderlying[0]["type"] & TUnderlying[1]["type"]
        : never
  : TKind extends "tuple" 
    ? TUnderlying extends readonly any[] 
      ? TupleToUnion<TUnderlying> 
      : never
  : TKind extends "object"
    ? TUnderlying extends readonly any[]
      ? TypeKvToObject<TUnderlying>
      : never
  : TKind extends "union" 
    ? TUnderlying extends readonly any[]
      ? TupleToUnion<TupleFilter<
          TUnderlying, 
          { kind: TypeKind; required: TypeIsRequired; underlying: readonly any[] | "none" }
        >>
      : never
  : TKind extends "intersection"
    ? TUnderlying extends readonly any[]
      ? UnionToIntersection<TupleToUnion<TupleFilter<
        TUnderlying, 
        { kind: TypeKind; required: TypeIsRequired; underlying: readonly any[] | "none" }
      >>>
    : never
: any;


/**
 * **TypeUnderlying**
 * 
 * Used in both `Type` and `TypeDefn` structures, it's value is one of
 * two types:
 * 
 * - `no-underlying` is used when no _underlying_ types are needed to
 * specify the type
 * - `readonly any[]` is used to host any set of values which _combine_
 * in some way to determine the **type** of the property
 * 
 * Note: the property `underlying_
 */
export type TypeUnderlying =  readonly any[] | "no-underlying";

export type TypeDefnValidations = readonly any[] | "no-validations";

/**
 * **TypeDefaultValue**
 * 
 * The resultant _value_ of the `defaultValue` prop in a `Type` structure 
 * and one of the generic's used to hold specifics for a `TypeDefn` struct.
 * 
 * - either a Box<T> where T extends the type of the property
 * - or, the constant `NoDefaultValue` indicating no default was set
 * 
 * Note: the _generic_ `TWithDefault` in a `Type` is defined as `TypeHasDefaultValue`
 * which is used to preserve type info but provide developers a "summarized status."
 */
export type TypeDefaultValue<
  TKind extends TypeKind = TypeKind,
  TRequired extends boolean = boolean,
  TUnderlying extends TypeUnderlying = TypeUnderlying
> = Box<ToType<TKind, TRequired, TUnderlying>> | NoDefaultValue;


/**
 * **TypeDefn**`<TKind,TRequired,TDesc,TUnderlying,...>`
 * 
 * Represents a minimal `Type` definition.
 * 
 * Note: this type is typically then converted to a `Type<...>` type.
 */
export interface TypeDefn<
  TKind extends TypeKind = TypeKind,
  TRequired extends boolean = boolean,
  TDesc extends string = string,
  TUnderlying extends TypeUnderlying = TypeUnderlying,
  TDefaultVal extends TypeDefaultValue<TKind, TRequired, TUnderlying> = TypeDefaultValue<TKind, TRequired, TUnderlying>,
  TValidations extends TypeDefnValidations = TypeDefnValidations,
> {
  readonly kind: TKind;
  readonly isRequired?: TRequired;
  readonly underlying?: TUnderlying;
  readonly description?: TDesc;
  readonly defaultValue?: TDefaultVal;
  readonly validations?: TValidations;
}

/**
 * **FromTypeDefn**`<TypeDefn>`
 * 
 * Type utility which converts from the minimalist `TypeDefn` to a full
 * fledged `Type` definition.
 */
export type FromTypeDefn<
  TD extends TypeDefn
> = TD extends TypeDefn<
  infer Kind,
  infer Required,
  infer Desc,
  infer Underlying,
  infer DefaultValue,
  infer Validations
>
  ? Type<
      Kind,
      IfEquals<
        Required, boolean, 
        "required",
        IfFalse<Required, "not-required", "required">
      >,
      IfStringLiteral<Desc, Desc, "">,
      IfArray<Underlying, Exclude<Underlying, "no-underlying">, "no-underlying">,
      IfOr<
        [
          IsEqual<DefaultValue, NoDefaultValue>, 
          IsUnion<DefaultValue>
        ],
        "no-default-value", 
        "with-default-value"
      >,
      IfOr<
        [
          IsEqual<Validations, "no-validations">, 
          IsUnion<Validations>
        ],
        "no-validations", 
        "with-validations"
      >
      // IfEquals<Validations, "no-validations", "no-validations", "with-validations">
    >
  : never;

export type TypeHasDefaultValue = "no-default-value" | "with-default-value";
export type TypeHasValidations = "no-validations" | "with-validations";
export type TypeHasUnderlying = "no-underlying" | "literals" | "children";


/**
 * A type definition which retains valuable runtime characteristics
 */
export type Type<
  TKind extends TypeKind = TypeKind, 
  TRequired extends TypeIsRequired = TypeIsRequired,
  TDesc extends string = string,
  TUnderlying extends TypeUnderlying = TypeUnderlying,
  TWithDefault extends TypeHasDefaultValue = TypeHasDefaultValue,
  TWithValidations extends TypeHasValidations = TypeHasValidations,
> = {
  _type: "Type"; 
  /** 
   * **kind**
   * 
   * The _type_ / _category_ of the type (e.g., string, stringLiteral, number, etc).
   */
  kind: TKind;
  /** 
   * **type**
   * 
   * The fully expressed _type definition_. 
   * 
   * **Note:** do not use this for anything in the runtime environment
   */
  type: ToType<TKind, TRequired, TUnderlying>;

  /**
   * **isRequired** 
   * 
   * Whether or not this type is _required_ to exist or if it's type
   * should be a union with `undefined`; will default to `required`
   */
  isRequired: TRequired extends "not-required" ? false : true;

  /**
   * Whether the given runtime type is a narrow literal type
   */
  isLiteral: TKind extends TypeKindLiteral ? true : false;

  /**
   * This can be an array of _type literals_ or a container
   * type (e.g., object, union, intersection, tuple, etc.).
   * 
   * In all cases, the _underlying_ types represent the type
   * definition using the _logical operand_ of the `underlying_operand`
   * property.
   */
  underlying: TUnderlying;

  /**
   * **underlying_operand**
   * 
   * In cases where a runtime type has _underlying_ types, this property
   * expresses how they should be merged together into a type. In most cases
   * this is an `OR` operand but not all.
   */
  underlying_operand: TUnderlying extends "no-underlying"
    ? "NA"
    : TKind extends "intersection" ? "AND" : "OR";

  /**
   * **defaultValue**
   * 
   * A default value to set this variable to at runtime;
   * defaults to not being set but when it is said then 
   * certain additional runtime operations are possible.
   */
  defaultValue: TWithDefault extends "no-default-value"
    ? NoDefaultValue
    : Box<ToType<TKind, TRequired, TUnderlying>>;

  /** 
   * **isUnion**
   * 
   * Whether or not the type represents a _union_ type. This can be true in 
   * obvious cases like a `union` _type_ but **any** type which is not required
   * is also in effect a union type too.
   */
  isUnion: boolean;

  /**
   * **is**`(input: unknown): input is T`
   * 
   * a **type guard** function which helps users to ensures type safety
   * for the given type.
   */
  is: TypeGuard<ToType<TKind, TRequired, TUnderlying>>;

  /** 
   * **validate**`(val) => boolean`
   * 
   * Runs any runtime configurations which were provided to the runtime type.
   */
  validate: <V extends ToType<TKind, TRequired, TUnderlying>>(val: V) => boolean;

  /**
   * **validations**
   * 
   * An optional array of runtime validations which can be performed on the
   * runtime type. When the `validate()` function is called these functions
   * along with any _underlying_ types which have validators will be run to ensure
   * the validity at all levels of the type.
   */
  validations: TWithValidations extends "no-validations"
    ? readonly []
    : readonly any[];

  identity: ToType<TKind, TRequired, TUnderlying> | NotApplicable<"some types do not have an identity value for concat/sum">;

  /** Description of the type */
  description: TDesc;
};



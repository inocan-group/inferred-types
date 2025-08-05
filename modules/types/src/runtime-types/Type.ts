import type {
    FALSY_TYPE_KINDS,
    LITERAL_TYPE_KINDS,
    NARROW_CONTAINER_TYPE_KINDS,
    NoDefaultValue,
    NotApplicable,
    WIDE_CONTAINER_TYPE_KINDS,
    WIDE_TYPE_KINDS,
} from "inferred-types/constants";
import type {
    AnyFunction,
    As,
    Box,
    Err,
    Extends,
    If,
    IsArray,
    IsEqual,
    IsFalse,
    IsStringLiteral,
    IsUnion,
    Narrowable,
    NotFilter,
    Or,
    TupleToUnion,
    TypeGuard,
    UnionToIntersection,
} from "inferred-types/types";

export interface TypeOptions<
    TKind extends TypeKind = TypeKind,
    TRequired extends boolean = boolean,
    TDesc extends string = string,
    TUnderlying extends TypeUnderlying = TypeUnderlying,
    TDefaultValue extends TypeDefaultValue<TKind, TRequired, TUnderlying> = TypeDefaultValue<
        TKind,
        TRequired,
        TUnderlying
    >,
    TValidations extends readonly unknown[] | "no-validations" = readonly unknown[] | "no-validations",
> {
    isRequired?: TRequired;
    validations?: TValidations;
    defaultValue?: TDefaultValue;
    description?: TDesc;
}

export type TypeKindLiteral = TupleToUnion<typeof LITERAL_TYPE_KINDS>;
export type TypeKindWide = TupleToUnion<typeof WIDE_TYPE_KINDS>;
export type TypeKindFalsy = TupleToUnion<typeof FALSY_TYPE_KINDS>;
export type TypeKindContainerNarrow = TupleToUnion<typeof NARROW_CONTAINER_TYPE_KINDS>;
export type TypeKindContainerWide = TupleToUnion<typeof WIDE_CONTAINER_TYPE_KINDS>;
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
export type IsLiteralKind<T extends TypeKind> = If<
    Or<[
        If<Extends<T, TypeKindLiteral>, true, false>,
        If<Extends<T, TypeKindContainerNarrow>, true, false>,
    ]>,
    true,
    false
>;

export type IfLiteralKind<
    T extends TypeKind,
    IF extends Narrowable,
    ELSE extends Narrowable,
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
    TUnderlying extends TypeUnderlying = "no-underlying",
> = If<
    Or<[
        Extends<TRequired, "not-required">,
        Extends<TRequired, false>,
    ]>,
      ToBaseType<TKind, TUnderlying> | undefined,
      ToBaseType<TKind, TUnderlying>
>;

type ToBaseType<
    TKind extends TypeKind,
    TUnderlying extends TypeUnderlying = "no-underlying",
> //
  = TKind extends "string" ? string
      : TKind extends "number" ? number
          : TKind extends "boolean" ? boolean
              : TKind extends "null" ? null
                  : TKind extends "undefined" ? undefined
                      : TKind extends "stringLiteral" ? TupleToUnion<TUnderlying>
                          : TKind extends "numericLiteral" ? TupleToUnion<TUnderlying>
                              : TKind extends "true" ? true
                                  : TKind extends "false" ? false
                                      : TKind extends "anyArray" ? unknown[]
                                          : TKind extends "unknownObject" ? Record<string, unknown>
                                              : TKind extends "unknownObject" ? Record<string, unknown>
                                                  : TKind extends "unknownFunction" ? AnyFunction
                                                      : TKind extends "unknownObject" ? Record<string, unknown>
                                                          : TKind extends "fnWithDict"
                                                              ? TUnderlying extends readonly [
                                                                  { kind: "fnType"; type: unknown; [key: string]: unknown },
                                                                  { kind: "object"; type: unknown; [key: string]: unknown },
                                                              ]
                                                                  ? TUnderlying[0]["type"] & TUnderlying[1]["type"]
                                                                  : never
                                                              : TKind extends "tuple"
                                                                  ? TUnderlying extends readonly unknown[]
                                                                      ? TupleToUnion<TUnderlying>
                                                                      : never
                                                                  : TKind extends "union"
                                                                      ? TUnderlying extends readonly unknown[]
                                                                          ? TupleToUnion<NotFilter<
                                                                              TUnderlying,
                                                                              "extends",
                                                                              {
                                                                                  kind: TypeKind;
                                                                                  required: TypeIsRequired;
                                                                                  underlying: readonly unknown[] | "none";
                                                                              }
                                                                          >>
                                                                          : never
                                                                      : TKind extends "intersection"
                                                                          ? TUnderlying extends readonly unknown[]
                                                                              ? UnionToIntersection<TupleToUnion<NotFilter<
                                                                                  TUnderlying,
                                                                                  "extends",
                                                                                  {
                                                                                      kind: TypeKind;
                                                                                      required: TypeIsRequired;
                                                                                      underlying: readonly unknown[] | "none";
                                                                                  }
                                                                              >>>
                                                                              : never
                                                                          : unknown;

/**
 * **TypeUnderlying**
 *
 * Used in both `Type` and `TypeDefn` structures, it's value is one of
 * two types:
 *
 * - `no-underlying` is used when no _underlying_ types are needed to
 * specify the type
 * - `readonly unknown[]` is used to host unknown set of values which _combine_
 * in some way to determine the **type** of the property
 *
 * Note: the property `underlying_
 */
export type TypeUnderlying = readonly unknown[] | "no-underlying";

export type TypeDefnValidations = readonly unknown[] | "no-validations";

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
    TUnderlying extends TypeUnderlying = TypeUnderlying,
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
    TD extends TypeDefn,
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
        IsEqual<Required, boolean> extends true
            ? "required"
            : IsFalse<Required> extends true ? "not-required" : "required",
        IsStringLiteral<Desc> extends true ? Desc : "",
        IsArray<Underlying> extends true ? Exclude<Underlying, "no-underlying"> : "no-underlying",
        As<If<
            Or<[
                IsEqual<DefaultValue, NoDefaultValue>,
                IsUnion<DefaultValue>,
            ]>,
            "no-default-value",
            "with-default-value"
        >, TypeHasDefaultValue>,
        As<If<
            Or<[
                IsEqual<Validations, "no-validations">,
                IsUnion<Validations>,
            ]>,
            "no-validations",
            "with-validations"
        >, TypeHasValidations>
    // IfEquals<Validations, "no-validations", "no-validations", "with-validations">
    >
    : never;

export type TypeHasDefaultValue = "no-default-value" | "with-default-value";
export type TypeHasValidations = "no-validations" | "with-validations";
export type TypeHasUnderlying = "no-underlying" | "literals" | "children";

/**
 * A function which is provided a value `T` and must either return
 * `true` or an `ErrorCondition` which describes the issue.
 */
export type ValidationFunction = <T, E extends string>(value: T) => true | Err<E>;

/**
 * A type definition which retains valuable runtime characteristics
 */
export interface Type<
    TKind extends TypeKind = TypeKind,
    TRequired extends TypeIsRequired = TypeIsRequired,
    TDesc extends string = string,
    TUnderlying extends TypeUnderlying = TypeUnderlying,
    TWithDefault extends TypeHasDefaultValue = TypeHasDefaultValue,
    TWithValidations extends TypeHasValidations = TypeHasValidations,
> {
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
        : readonly ValidationFunction[];

    identity: ToType<TKind, TRequired, TUnderlying> | NotApplicable<"some types do not have an identity value for concat/sum">;

    /** Description of the type */
    description: TDesc;
}

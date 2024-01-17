/* eslint-disable @typescript-eslint/no-explicit-any */

import { 

  Type, 
  TypeDefaultValue, 
  TypeDefn, 
  TypeHasDefaultValue, 
  TypeIsRequired, 
  TypeKind, 
  TypeKindContainerNarrow, 
  TypeKindContainerWide, 
  TypeKindFalsy, 
  TypeKindLiteral, 
  TypeKindWide
} from "src/types/index";

import {
  FALSY_TYPE_KINDS, 
  LITERAL_TYPE_KINDS,
  WIDE_TYPE_KINDS, 
} from "src/constants/index";


/**
 * **isTypeDefn**()
 * 
 * A type guard that validates the passed in variable is some sort of
 * `TypeDefn<T>` type.
 */
export function isTypeDefn<
  TKind extends TypeKind,
  TRequired extends boolean,
  TDesc extends string = string,
  TUnderlying extends readonly unknown[] | "no-underlying" = "no-underlying",
  TDefaultValue extends TypeDefaultValue<TKind, TRequired, TUnderlying> = TypeDefaultValue<TKind, TRequired, TUnderlying>,
  TValidations extends readonly unknown[] | "no-validations" = readonly unknown[] | "no-validations",
  TD extends TypeDefn<TKind, TRequired, TDesc, TUnderlying, TDefaultValue, TValidations> = TypeDefn<TKind, TRequired, TDesc,  TUnderlying, TDefaultValue, TValidations>
>(thing: unknown | TD): thing is TD {
  return (
    typeof thing === "object" && "kind" in (thing as object) && typeof (thing as any).isRequired === "boolean"
  )
    ? true
    : false;
}

/**
 * **isRuntimeType**(thing)
 * 
 * A type guard which identifies if the value passed in is a `Type` type definition.
 */
export function isRuntimeType<
  U extends Type
>(thing: unknown | U): thing is U {
  return (
    typeof thing === "object" && "_type" in (thing as object) && (thing as any)._type === "Type"
  );
}

export function isObjectType<
  U extends Type<"object", TypeIsRequired, string>
>(thing: unknown): thing is U {
  return (
    isRuntimeType(thing) && 
    thing.kind === "object" && 
    Array.isArray(thing.underlying)
  );
}

export function isIntersectionType<
  U extends Type<"intersection", TypeIsRequired, string, readonly Type[]>
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && thing.kind === "intersection";
}

export function isUnionType<
  U extends Type<"union", TypeIsRequired, string, readonly Type[]>
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && thing.kind === "union";
}

export function isTupleType<
  U extends Type<"tuple", TypeIsRequired, string, readonly Type[]>
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && thing.kind === "union";
}

/** Type Guard to validate that type is a "wide type" (e.g., string, number, boolean) */
export function isWideType<
  TKind extends TypeKindWide, 
  TRequired extends TypeIsRequired,
  TUnderlying extends readonly any[] | readonly [],
  TDesc extends string,
  U extends Type<
    TKind, TRequired, TDesc, TUnderlying
  >
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && WIDE_TYPE_KINDS.includes(thing.kind as any);
}

/** Type Guard to validate that type is a "falsy type" (e.g., undefined, null) */
export function isFalsyType<
  TKind extends TypeKindFalsy, 
  TRequired extends TypeIsRequired,
  TDesc extends string,
  TUnderlying extends readonly any[] | readonly [],
  U extends Type<
    TKind, TRequired, TDesc, TUnderlying 
  >
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && FALSY_TYPE_KINDS.includes(thing.kind as any);
}

/** 
 * **isLiteralType**(t)
 * 
 * Type Guard to validate that runtime type is a "literal type" 
 * (e.g., string literal, numeric literal, boolean literal, true, 
 * false, etc.) 
 */
export function isLiteralType<
  TKind extends TypeKindLiteral, 
  TRequired extends TypeIsRequired,
  TDesc extends string,
  TUnderlying extends readonly unknown[] | readonly [],
  TDefault extends TypeHasDefaultValue,
  U extends Type<
    TKind, TRequired, TDesc, TUnderlying, TDefault
  >
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && LITERAL_TYPE_KINDS.includes(thing.kind as any) && Array.isArray(thing.underlying);
}

export function isStringLiteralType<
  U extends Type<"stringLiteral", TypeIsRequired, string, readonly string[]>
>(thing: unknown | U): thing is U {
  return (
    isRuntimeType(thing) && thing.kind === "stringLiteral"
  );
}

/** 
 * Type Guard to validate that type is a "narrow container" (e.g., object, tuple, etc.) 
 */
export function isNarrowContainer<
  TKind extends TypeKindContainerNarrow, 
  TRequired extends TypeIsRequired,
  TDesc extends string,
  TUnderlying extends readonly unknown[] | readonly [],
  TDefault extends TypeHasDefaultValue,
  U extends Type<
    TKind, TRequired,  TDesc,  TUnderlying , TDefault
  >
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && LITERAL_TYPE_KINDS.includes(thing.kind as any);
}

/** 
 * Type Guard to validate that runtime type has _underlying_ aspects
 * which are being used to define it's type.
 */
export function hasUnderlyingTypes<
  TKind extends TypeKindContainerNarrow | TypeKindLiteral, 
  TRequired extends TypeIsRequired,
  TDesc extends string,
  TUnderlying extends readonly unknown[] | readonly [],
  TDefault extends TypeHasDefaultValue,
  U extends Type<
    TKind, TRequired,  TDesc,  TUnderlying , TDefault
  >
>(thing: unknown | U): thing is U {
  return isRuntimeType(thing) && Array.isArray(thing.underlying);
}

/** 
 * Type Guard to validate that runtime type has _underlying_ aspects
 * which are being used to define it's type.
 */
export function hasNoUnderlyingTypes<
  TKind extends TypeKindWide | TypeKindFalsy | TypeKindContainerWide, 
  TRequired extends TypeIsRequired,
  TDesc extends string,
  TUnderlying extends readonly unknown[] | readonly [],
  TDefault extends TypeHasDefaultValue,
  U extends Type<
    TKind, TRequired,  TDesc,  TUnderlying , TDefault
  >
>(thing: unknown | U): thing is U {
  return hasUnderlyingTypes(thing) ? false : true;
}

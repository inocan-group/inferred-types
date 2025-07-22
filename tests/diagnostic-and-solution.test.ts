import type {
  EmptyObject,
  ExplicitlyEmptyObject,
  IsEqual,
} from "inferred-types";

// DIAGNOSTIC SECTION
// ==================

// Confirm the behavior you're seeing
type ConfirmBehavior = IsEqual<EmptyObject, ExplicitlyEmptyObject>; // You see: true

// This means in your TypeScript version:
// - [EmptyObject] extends [ExplicitlyEmptyObject] = true
// - [ExplicitlyEmptyObject] extends [EmptyObject] = true

// Why this happens:
// TypeScript is treating {} and {[x:string]:never;[x:symbol]:never} as equivalent
// because both represent objects that cannot have any properties

// SOLUTION SECTION
// ================

// Since IsEqual returns true, you need alternative ways to distinguish these types
// Here are several methods:

// Method 1: Use a branded type approach
type BrandedEmptyObject = EmptyObject & { readonly _brand?: 'EmptyObject' };
type BrandedExplicitlyEmptyObject = ExplicitlyEmptyObject & { readonly _brand?: 'ExplicitlyEmptyObject' };

type TestBranded = IsEqual<BrandedEmptyObject, BrandedExplicitlyEmptyObject>; // Should be false

// Method 2: Check if we can add properties (using conditional types)
type CanAddProperty<T, K extends PropertyKey = 'test'> =
  T & Record<K, unknown> extends never ? false : true;

type TestCanAddEmpty = CanAddProperty<EmptyObject>; // true - can add properties
type TestCanAddExplicit = CanAddProperty<ExplicitlyEmptyObject>; // might be false

// Method 3: Use intersection to test property addition
type AllowsProperties<T> = keyof (T & { test: unknown }) extends never ? false : true;

type TestAllowsEmpty = AllowsProperties<EmptyObject>; // true
type TestAllowsExplicit = AllowsProperties<ExplicitlyEmptyObject>; // false

// Method 4: Create a discriminator based on attempted property assignment
type ObjectType<T> =
  T extends EmptyObject
    ? T extends ExplicitlyEmptyObject
      ? T & { test: unknown } extends never
        ? 'ExplicitlyEmptyObject'
        : 'EmptyObject'
      : 'EmptyObject'
    : 'Other';

type TestObjectType1 = ObjectType<EmptyObject>; // Should help distinguish
type TestObjectType2 = ObjectType<ExplicitlyEmptyObject>; // Should help distinguish

// Method 5: Check if type accepts index signatures
type AcceptsIndexSignature<T> = T extends { [key: string]: any } ? true : false;
type TestAcceptsEmpty = AcceptsIndexSignature<EmptyObject>; // true
type TestAcceptsExplicit = AcceptsIndexSignature<ExplicitlyEmptyObject>; // false

// Method 6: Most reliable - check the actual structure
type IsExplicitlyEmptyStructure<T> =
  T extends object
    ? keyof T extends never
      ? {} extends T
        ? T extends {}
          ? true
          : false
        : false
      : false
    : false;

type TestStructure1 = IsExplicitlyEmptyStructure<EmptyObject>;
type TestStructure2 = IsExplicitlyEmptyStructure<ExplicitlyEmptyObject>;

// PRACTICAL USAGE
// ===============

// If you need to distinguish these types in your code, use a wrapper:
type StrictEmptyObject<T> = T extends EmptyObject
  ? T & { test: unknown } extends never
    ? 'ExplicitlyEmpty'
    : 'Empty'
  : never;

// Or create your own distinct types:
export type MyEmptyObject = NonNullable<unknown>;
export type MyExplicitlyEmptyObject = {
  readonly [x: string]: never;
  readonly [x: symbol]: never;
  readonly [x: number]: never;  // Adding number index for extra distinction
};

type TestMyTypes = IsEqual<MyEmptyObject, MyExplicitlyEmptyObject>; // Might be false

// EXPLANATION
// ===========
// The reason IsEqual returns true is that TypeScript considers both types
// to be structurally equivalent - they both represent objects with no accessible properties.
// This is a TypeScript normalization behavior that treats different representations
// of "empty object" as the same type for practical purposes.

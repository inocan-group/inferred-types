import type {
  EmptyObject,
  ExplicitlyEmptyObject,
  IsEqual,
} from "inferred-types";

// First, let's verify what you're seeing
type YourObservation = IsEqual<EmptyObject, ExplicitlyEmptyObject>; // You say this is true

// Let's test if TypeScript is treating {} and {[x:string]:never} as the same
type TestCase1 = IsEqual<{}, {[x: string]: never; [x: symbol]: never}>;
type TestCase2 = IsEqual<NonNullable<unknown>, {[x: string]: never; [x: symbol]: never}>;

// What about simpler cases?
type TestCase3 = {} extends {[x: string]: never} ? true : false;
type TestCase4 = {[x: string]: never} extends {} ? true : false;

// Test with actual object creation
const emptyObj: EmptyObject = {};
const explicitEmpty: ExplicitlyEmptyObject = {};

// Can we assign between them?
const test1: EmptyObject = {} as ExplicitlyEmptyObject;
const test2: ExplicitlyEmptyObject = {} as EmptyObject;

// What about with properties?
// This should work for EmptyObject but not ExplicitlyEmptyObject
const withProp1: EmptyObject = { foo: "bar" };
// @ts-expect-error - This should error
const withProp2: ExplicitlyEmptyObject = { foo: "bar" };

// Direct comparison of the underlying types
type Direct1 = NonNullable<unknown>;
type Direct2 = { [x: string]: never; [x: symbol]: never };
type DirectEqual = IsEqual<Direct1, Direct2>;

// The reason they might be equal is if TypeScript is normalizing both to the same type
// Let's check what TypeScript thinks these types are:

// Theory 1: TypeScript might be treating NonNullable<unknown> as equivalent to never index signatures
type Theory1_Check = NonNullable<unknown> extends { [x: string]: never; [x: symbol]: never } ? true : false;
type Theory1_Reverse = { [x: string]: never; [x: symbol]: never } extends NonNullable<unknown> ? true : false;

// Theory 2: The issue might be with how these specific type aliases are defined
// Let's redefine them locally
type LocalEmptyObject = NonNullable<unknown>;
type LocalExplicitlyEmptyObject = { [x: string]: never; [x: symbol]: never };
type LocalEqual = IsEqual<LocalEmptyObject, LocalExplicitlyEmptyObject>;

// Theory 3: TypeScript version differences
// Different TypeScript versions might handle these types differently

// Let's also test a stricter equality check
type StrictEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

type StrictTest = StrictEqual<EmptyObject, ExplicitlyEmptyObject>;

// Summary - hover over these to see the results:
type DebugSummary = {
  YourObservation: YourObservation;
  TestCase1_BracesVsNever: TestCase1;
  TestCase2_NonNullVsNever: TestCase2;
  DirectEqual: DirectEqual;
  LocalEqual: LocalEqual;
  StrictTest: StrictTest;
  Theory1_Check: Theory1_Check;
  Theory1_Reverse: Theory1_Reverse;
};

// If IsEqual returns true, it means both types are extending each other
// This would mean TypeScript considers them structurally identical
// This could happen in newer TypeScript versions where {} is treated more strictly

import { Equal, Expect } from "@type-challenges/utils";
import type {
  EmptyObject,
  ExplicitlyEmptyObject,
  IsEqual,
} from "inferred-types";

// Direct test - what does IsEqual actually return?
type DirectTest = IsEqual<EmptyObject, ExplicitlyEmptyObject>;
type ShowResult = DirectTest; // Hover over this to see the actual result

// Let's also test with the test framework
// If this passes, it means IsEqual returns true (which is unexpected)
type Test_IsEqual_Returns_True = Expect<Equal<
  IsEqual<EmptyObject, ExplicitlyEmptyObject>,
  true
>>;

// Let's check the reverse too
type ReverseTest = IsEqual<ExplicitlyEmptyObject, EmptyObject>;
type Test_Reverse_Also_True = Expect<Equal<
  IsEqual<ExplicitlyEmptyObject, EmptyObject>,
  true
>>;

// Let's trace through the IsEqual implementation manually
// IsEqual uses: [X] extends [Y] ? [Y] extends [X] ? true : false : false

// Step 1: Does [EmptyObject] extend [ExplicitlyEmptyObject]?
type Step1 = [EmptyObject] extends [ExplicitlyEmptyObject] ? true : false;
type ShowStep1 = Step1; // What does this evaluate to?

// Step 2: Does [ExplicitlyEmptyObject] extend [EmptyObject]?
type Step2 = [ExplicitlyEmptyObject] extends [EmptyObject] ? true : false;
type ShowStep2 = Step2; // What does this evaluate to?

// If both are true, IsEqual returns true
type ManualIsEqual = Step1 extends true ? Step2 extends true ? true : false : false;
type ShowManual = ManualIsEqual;

// Let's check the actual type definitions
type CheckEmptyObject = EmptyObject; // Should be NonNullable<unknown>
type CheckExplicitlyEmpty = ExplicitlyEmptyObject; // Should be { [x: string]: never; [x: symbol]: never }

// Test assignability
const test1: EmptyObject = {} as ExplicitlyEmptyObject; // Should work
const test2: ExplicitlyEmptyObject = {} as EmptyObject; // Should work

// More detailed checks
type EmptyObjectDef = NonNullable<unknown>;
type ExplicitDef = { [x: string]: never; [x: symbol]: never };

// Are these the same?
type DefCheck = IsEqual<EmptyObjectDef, ExplicitDef>;
type ShowDefCheck = DefCheck;

// Let's check if NonNullable<unknown> is somehow equivalent to the never index signature
type NonNullableUnknown = NonNullable<unknown>;
type NeverIndexSig = { [x: string]: never; [x: symbol]: never };

// Direct comparison
type DirectComparison = [NonNullableUnknown] extends [NeverIndexSig]
  ? [NeverIndexSig] extends [NonNullableUnknown]
    ? "Both extend each other - IsEqual returns true!"
    : "Only one way"
  : "Not equivalent";

type ShowComparison = DirectComparison;

// The issue might be that {} (NonNullable<unknown>) is being treated as
// equivalent to { [x: string]: never; [x: symbol]: never } by TypeScript

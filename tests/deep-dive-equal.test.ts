import { Equal, Expect } from "@type-challenges/utils";
import type {
  EmptyObject,
  ExplicitlyEmptyObject,
  IsEqual,
} from "inferred-types";

// What are these types exactly?
type ShowEmpty = EmptyObject; // NonNullable<unknown>
type ShowExplicit = ExplicitlyEmptyObject; // { [x: string]: never; [x: symbol]: never }

// Test IsEqual result
type ActualResult = IsEqual<EmptyObject, ExplicitlyEmptyObject>;

// Manual checks
type Check1 = [EmptyObject] extends [ExplicitlyEmptyObject] ? true : false;
type Check2 = [ExplicitlyEmptyObject] extends [EmptyObject] ? true : false;

// Direct type definitions
type DirectEmpty = NonNullable<unknown>;
type DirectExplicit = { [x: string]: never; [x: symbol]: never };

// Test with direct definitions
type DirectIsEqual = IsEqual<DirectEmpty, DirectExplicit>;
type DirectCheck1 = [DirectEmpty] extends [DirectExplicit] ? true : false;
type DirectCheck2 = [DirectExplicit] extends [DirectEmpty] ? true : false;

// Test with {} directly
type EmptyBraces = {};
type TestEmptyBraces1 = IsEqual<EmptyBraces, ExplicitlyEmptyObject>;
type TestEmptyBraces2 = IsEqual<EmptyBraces, EmptyObject>;

// Test NonNullable<unknown> behavior
type NonNullUnknown = NonNullable<unknown>;
type TestNonNull1 = [NonNullUnknown] extends [{ [x: string]: never; [x: symbol]: never }] ? true : false;
type TestNonNull2 = [{ [x: string]: never; [x: symbol]: never }] extends [NonNullUnknown] ? true : false;

// Check if {} is the same as NonNullable<unknown>
type IsBracesNonNull = IsEqual<{}, NonNullable<unknown>>;

// The issue might be with how TypeScript treats these specific type aliases
// Let's test if the issue is with the specific imports
type TestImportedEmpty = EmptyObject;
type TestImportedExplicit = ExplicitlyEmptyObject;

// Are these assignable?
type Assignable1 = EmptyObject extends ExplicitlyEmptyObject ? true : false;
type Assignable2 = ExplicitlyEmptyObject extends EmptyObject ? true : false;

// What if we use a different equality check?
type StrictEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type StrictResult = StrictEqual<EmptyObject, ExplicitlyEmptyObject>;

// Summary of results (hover over these to see):
type Results = {
  ActualIsEqual: ActualResult;
  ManualCheck1: Check1;
  ManualCheck2: Check2;
  DirectIsEqual: DirectIsEqual;
  StrictEqual: StrictResult;
  IsBracesNonNull: IsBracesNonNull;
};

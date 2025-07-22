import { Equal, Expect } from "@type-challenges/utils";
import type {
  EmptyObject,
  ExplicitlyEmptyObject,
  IsEqual,
} from "inferred-types";

// Import from the source file directly since it's not re-exported yet
import type {
  CanHaveProperties,
  IsExplicitlyEmptyObject,
  IsWideEmptyObject,
  EmptyObjectKind,
  AcceptsProperties,
  IsNeverIndexed,
  DistinguishEmpty,
} from "../../../modules/types/src/boolean-logic/operators/DistinguishEmptyTypes";

// Shows the problem: IsEqual returns true (according to user)
type Problem = IsEqual<EmptyObject, ExplicitlyEmptyObject>;
// This will show what it actually returns in your environment

// Test CanHaveProperties distinguishes them
type Test1_CanHave_Empty = CanHaveProperties<EmptyObject>;
type Test1_CanHave_Explicit = CanHaveProperties<ExplicitlyEmptyObject>;

// Test IsExplicitlyEmptyObject
type Test2_IsExplicit_Empty = IsExplicitlyEmptyObject<EmptyObject>;
type Test2_IsExplicit_Explicit = IsExplicitlyEmptyObject<ExplicitlyEmptyObject>;
type Test2_IsExplicit_Literal = IsExplicitlyEmptyObject<{}>;
type Test2_IsExplicit_NonEmpty = IsExplicitlyEmptyObject<{ foo: string }>;

// Test IsWideEmptyObject
type Test3_IsWide_Empty = IsWideEmptyObject<EmptyObject>;
type Test3_IsWide_Explicit = IsWideEmptyObject<ExplicitlyEmptyObject>;
type Test3_IsWide_Literal = IsWideEmptyObject<{}>;
type Test3_IsWide_NonEmpty = IsWideEmptyObject<{ foo: string }>;

// Test EmptyObjectKind
type Test4_Kind_Empty = EmptyObjectKind<EmptyObject>;
type Test4_Kind_Explicit = EmptyObjectKind<ExplicitlyEmptyObject>;
type Test4_Kind_Literal = EmptyObjectKind<{}>;
type Test4_Kind_NonEmpty = EmptyObjectKind<{ foo: string }>;

// Test AcceptsProperties
type Test5_Accepts_Empty = AcceptsProperties<EmptyObject>;
type Test5_Accepts_Explicit = AcceptsProperties<ExplicitlyEmptyObject>;

// Test IsNeverIndexed
type Test6_Never_Empty = IsNeverIndexed<EmptyObject>;
type Test6_Never_Explicit = IsNeverIndexed<ExplicitlyEmptyObject>;
type Test6_Never_Partial = IsNeverIndexed<{ [x: string]: never }>;

// Test DistinguishEmpty comprehensive analysis
type Test7_Distinguish_Empty = DistinguishEmpty<EmptyObject>;
type Test7_Distinguish_Explicit = DistinguishEmpty<ExplicitlyEmptyObject>;

// Practical usage examples

// Example 1: Type guard based on property capability
type GuardEmpty<T> = CanHaveProperties<T> extends true
  ? "This type can have properties added"
  : "This type cannot have properties";

type Example1_Empty = GuardEmpty<EmptyObject>;
type Example1_Explicit = GuardEmpty<ExplicitlyEmptyObject>;

// Example 2: Conditional logic based on empty type kind
type ProcessEmpty<T> = EmptyObjectKind<T> extends "explicit"
  ? "Handle explicitly empty"
  : EmptyObjectKind<T> extends "wide"
    ? "Handle wide empty"
    : "Handle other";

type Example2_Empty = ProcessEmpty<EmptyObject>;
type Example2_Explicit = ProcessEmpty<ExplicitlyEmptyObject>;

// Example 3: Using in function constraints
type RequiresPropertiesAllowed<T> = CanHaveProperties<T> extends true ? T : never;

type Example3_Empty = RequiresPropertiesAllowed<EmptyObject>; // Should be EmptyObject
type Example3_Explicit = RequiresPropertiesAllowed<ExplicitlyEmptyObject>; // Should be never

// Summary of all test results (hover over these to see actual values)
type TestResults = {
  problemStatement: {
    isEqual: Problem; // User says this is true
  };

  canHaveProperties: {
    emptyObject: Test1_CanHave_Empty; // Should be true
    explicitlyEmpty: Test1_CanHave_Explicit; // Should be false
  };

  isExplicitlyEmptyObject: {
    emptyObject: Test2_IsExplicit_Empty; // Should be false
    explicitlyEmpty: Test2_IsExplicit_Explicit; // Should be true
    literal: Test2_IsExplicit_Literal; // Should be false
    nonEmpty: Test2_IsExplicit_NonEmpty; // Should be false
  };

  isWideEmptyObject: {
    emptyObject: Test3_IsWide_Empty; // Should be true
    explicitlyEmpty: Test3_IsWide_Explicit; // Should be false
    literal: Test3_IsWide_Literal; // Should be true
    nonEmpty: Test3_IsWide_NonEmpty; // Should be true (extends EmptyObject)
  };

  emptyObjectKind: {
    emptyObject: Test4_Kind_Empty; // Should be "wide"
    explicitlyEmpty: Test4_Kind_Explicit; // Should be "explicit"
    literal: Test4_Kind_Literal; // Should be "literal"
    nonEmpty: Test4_Kind_NonEmpty; // Should be "not-empty"
  };

  acceptsProperties: {
    emptyObject: Test5_Accepts_Empty; // Should be true
    explicitlyEmpty: Test5_Accepts_Explicit; // Should be false
  };

  isNeverIndexed: {
    emptyObject: Test6_Never_Empty; // Should be false
    explicitlyEmpty: Test6_Never_Explicit; // Should be true
    partialNever: Test6_Never_Partial; // Should be false (needs both indexes)
  };

  distinguish: {
    emptyObject: Test7_Distinguish_Empty;
    explicitlyEmpty: Test7_Distinguish_Explicit;
  };

  examples: {
    guard: {
      empty: Example1_Empty;
      explicit: Example1_Explicit;
    };
    process: {
      empty: Example2_Empty;
      explicit: Example2_Explicit;
    };
    constraint: {
      empty: Example3_Empty;
      explicit: Example3_Explicit;
    };
  };
};

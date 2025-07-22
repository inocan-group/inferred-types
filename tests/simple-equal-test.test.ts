import { Equal, Expect } from "@type-challenges/utils";
import type {
  EmptyObject,
  ExplicitlyEmptyObject,
  IsEqual,
} from "inferred-types";

// Simple direct test
type TestResult = IsEqual<EmptyObject, ExplicitlyEmptyObject>;

// If this test passes, IsEqual returns false
// If it fails, IsEqual returns true
type TestExpectFalse = Expect<Equal<TestResult, false>>;

// Let's also create a runtime check
const checkResult: TestResult = false as any;
console.log("IsEqual<EmptyObject, ExplicitlyEmptyObject> =", checkResult);

// Test the underlying types
type ShowEmptyObject = EmptyObject;
type ShowExplicitlyEmptyObject = ExplicitlyEmptyObject;

// Manual implementation to double-check
type ManualIsEqual<X, Y> = [X] extends [Y] ? [Y] extends [X] ? true : false : false;
type ManualResult = ManualIsEqual<EmptyObject, ExplicitlyEmptyObject>;

// Test if this matches
type TestManualResult = Expect<Equal<ManualResult, TestResult>>;

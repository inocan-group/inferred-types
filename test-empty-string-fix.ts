import { StartsWith } from "inferred-types/types";

// Test empty string behavior
type EmptyString1 = StartsWith<"foobar", "">;
type EmptyString2 = StartsWith<"", "">;
type EmptyString3 = StartsWith<"any string", "">;

// Also test with arrays containing empty strings
type EmptyInArray1 = StartsWith<"foobar", ["foo", ""]>;
type EmptyInArray2 = StartsWith<"foobar", ["", "bar"]>;
type OnlyEmptyInArray = StartsWith<"foobar", [""]>;

// These should all be false now (previously would have been true)
const test1: EmptyString1 = false;
const test2: EmptyString2 = false;
const test3: EmptyString3 = false;

// Arrays with empty strings should still match valid patterns
const test4: EmptyInArray1 = true; // matches "foo"
const test5: EmptyInArray2 = false; // neither "" nor "bar" match
const test6: OnlyEmptyInArray = false; // only has empty string

console.log("All tests compile correctly - empty string fix is working!");
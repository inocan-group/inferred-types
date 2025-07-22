import { Equal, Expect } from "@type-challenges/utils";
import type {
  EmptyObject,
  ExplicitlyEmptyObject,
  IsEqual,
} from "inferred-types";

// Test 1: Confirm IsEqual behavior
type Test_IsEqual_Returns_False = Expect<Equal<
  IsEqual<EmptyObject, ExplicitlyEmptyObject>,
  false
>>;

// Test 2: Confirm reverse comparison also returns false
type Test_IsEqual_Reverse_Returns_False = Expect<Equal<
  IsEqual<ExplicitlyEmptyObject, EmptyObject>,
  false
>>;

// Test 3: EmptyObject accepts any object
type Test_EmptyObject_Accepts_Any = EmptyObject;
const obj1: Test_EmptyObject_Accepts_Any = {};
const obj2: Test_EmptyObject_Accepts_Any = { foo: "bar" };
const obj3: Test_EmptyObject_Accepts_Any = { a: 1, b: 2 };
const obj4: Test_EmptyObject_Accepts_Any = [1, 2, 3];

// Test 4: ExplicitlyEmptyObject only accepts {}
type Test_ExplicitlyEmpty_Only_Empty = ExplicitlyEmptyObject;
const explicit1: Test_ExplicitlyEmpty_Only_Empty = {};
// @ts-expect-error - Cannot assign properties to ExplicitlyEmptyObject
const explicit2: Test_ExplicitlyEmpty_Only_Empty = { foo: "bar" };

// Test 5: Check extends relationships
type EmptyExtendsExplicit = EmptyObject extends ExplicitlyEmptyObject ? true : false;
type ExplicitExtendsEmpty = ExplicitlyEmptyObject extends EmptyObject ? true : false;

// INTERESTING: Both extend each other, yet IsEqual returns false!
type Test_Empty_Extends_Explicit = Expect<Equal<EmptyExtendsExplicit, true>>;
type Test_Explicit_Extends_Empty = Expect<Equal<ExplicitExtendsEmpty, true>>;

// Test 6: Bidirectional extends check (how IsEqual works)
type Check1 = [EmptyObject] extends [ExplicitlyEmptyObject] ? true : false;
type Check2 = [ExplicitlyEmptyObject] extends [EmptyObject] ? true : false;

// Both checks return true, so why does IsEqual return false?
type Test_Bidirectional_Check1 = Expect<Equal<Check1, true>>;
type Test_Bidirectional_Check2 = Expect<Equal<Check2, true>>;

// Let's investigate further - the issue might be with the IsEqual implementation
// Let's test with a simpler equality check
type SimpleEqual<X, Y> = [X] extends [Y] ? [Y] extends [X] ? true : false : false;
type Test_SimpleEqual = Expect<Equal<SimpleEqual<EmptyObject, ExplicitlyEmptyObject>, true>>;

// So why does IsEqual return false? Let's check the actual types:
type ShowEmptyObject = EmptyObject; // NonNullable<unknown> = {}
type ShowExplicitlyEmptyObject = ExplicitlyEmptyObject; // { [x: string]: never; [x: symbol]: never }

// The key insight: These are structurally different types even though they have the same assignability

// Practical type utilities to distinguish between them:

// Method 1: Check if type has never index signatures
type IsExplicitlyEmpty<T> = T extends { [x: string]: never; [x: symbol]: never } ? true : false;

// Surprising result: EmptyObject also matches this pattern!
type Test_IsExplicitlyEmpty_EmptyObject = Expect<Equal<IsExplicitlyEmpty<EmptyObject>, true>>;
type Test_IsExplicitlyEmpty_ExplicitlyEmptyObject = Expect<Equal<IsExplicitlyEmpty<ExplicitlyEmptyObject>, true>>;

// Method 2: Use a more specific check
type HasNeverIndexSignature<T> = T extends Record<string, never> ? true : false;

type Test_HasNeverIndex_EmptyObject = Expect<Equal<HasNeverIndexSignature<EmptyObject>, false>>;
type Test_HasNeverIndex_ExplicitlyEmptyObject = Expect<Equal<HasNeverIndexSignature<ExplicitlyEmptyObject>, true>>;

// Method 3: Check exact type structure using conditional type distribution
type IsExactlyEmptyObject<T> = T extends NonNullable<unknown>
  ? unknown extends T
    ? true
    : false
  : false;

type Test_IsExactlyEmptyObject_Empty = Expect<Equal<IsExactlyEmptyObject<EmptyObject>, true>>;
type Test_IsExactlyEmptyObject_Explicit = Expect<Equal<IsExactlyEmptyObject<ExplicitlyEmptyObject>, false>>;

// Method 4: Use the actual IsEqual to distinguish
type DistinguishEmptyTypes<T> = IsEqual<T, EmptyObject> extends true
  ? "EmptyObject"
  : IsEqual<T, ExplicitlyEmptyObject> extends true
    ? "ExplicitlyEmptyObject"
    : "Other";

type Test_Distinguish_Empty = Expect<Equal<DistinguishEmptyTypes<EmptyObject>, "EmptyObject">>;
type Test_Distinguish_Explicit = Expect<Equal<DistinguishEmptyTypes<ExplicitlyEmptyObject>, "ExplicitlyEmptyObject">>;

// Summary:
// - EmptyObject is NonNullable<unknown> = {} (structurally different from ExplicitlyEmptyObject)
// - ExplicitlyEmptyObject has explicit never index signatures
// - IsEqual correctly returns false because they are structurally different types
// - Even though they have similar assignability, they are distinct types
// - Use HasNeverIndexSignature or IsExactlyEmptyObject to distinguish them

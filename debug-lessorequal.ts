import type {
    IsLessThanOrEqual,
    LessThanOrEqual,
    AsNumber,
    CompareNumbers
} from "inferred-types/types";

// Direct test of LessThanOrEqual
type T1 = LessThanOrEqual<5, 5>;
//   ^? should be true

// Test of IsLessThanOrEqual
type T2 = IsLessThanOrEqual<5, 5>;
//   ^? should be true

// Let's trace through the IsLessThanOrEqual logic manually
// A = 5, B = 5
// A extends number? Yes (5 extends number)
// B extends number? Yes (5 extends number)
// So we should get: LessThanOrEqual<5, 5>

// Let's check if the issue is with number literal vs number
type Is5Number = 5 extends number ? true : false; // should be true
type Is5Literal = number extends 5 ? true : false; // should be false

// Let's check CompareNumbers
type Cmp5_5 = CompareNumbers<5, 5>;
//   ^? should be "equal"

// Let's manually trace IsLessThanOrEqual
type Step1 = 5 extends number ? "yes" : "no"; // "yes"
type Step2 = 5 extends number ? "yes" : "no"; // "yes"
type Step3 = LessThanOrEqual<5, 5>; // should be true

// Test the actual branching logic
type TestBranch =
    5 extends number
    ? 5 extends number
        ? LessThanOrEqual<5, 5>
        : never
    : never;

const _t1: T1 = true;
const _t2: T2 = true; // This will error if T2 is not true
const _step3: Step3 = true;
const _testBranch: TestBranch = true;

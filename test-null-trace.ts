import { Widen, IsUnion, Container, Scalar, WidenScalar } from "./modules/types/src/index";

// Test null directly
type NullType = null;

// Step 1: Check IsUnion
type Step1_IsUnion = IsUnion<NullType>; // should be false

// Step 2: Check if it's a Container
type Step2_IsContainer = NullType extends Container ? true : false; // should be false

// Step 3: Check if it's a Scalar
type Step3_IsScalar = NullType extends Scalar ? true : false; // should be true

// Step 4: Apply WidenScalar
type Step4_WidenScalar = WidenScalar<NullType>; // should be null

// Final result
type FinalResult = Widen<NullType>; // should be null

// Test in array context
type ArrayWithNull = [string, number, boolean, null];
type WidenArray = Widen<ArrayWithNull>;

console.log("Done");
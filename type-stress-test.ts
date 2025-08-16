// Stress test to measure type instantiation depth differences

// Test the actual And/Or from the codebase
type ActualAndResult = [
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, false
];

type ActualOrResult = [
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, true
];

// Test deeply nested scenarios
type DeeplyNested1 = ActualAndResult;
type DeeplyNested2 = ActualOrResult;
type DeeplyNested3 = [...ActualAndResult, ...ActualOrResult];

// Complex function composition test
type ComplexScenario = [
    DeeplyNested1,
    DeeplyNested2,
    DeeplyNested3
];
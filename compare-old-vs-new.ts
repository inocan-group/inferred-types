// Compare old complex approach vs new streamlined approach

// Simulate the old complex approach with many abstraction layers
type OldComplexAnd<
    T extends readonly unknown[],
    TOpt extends { empty?: unknown; err?: "false" | "error" } = { empty: false; err: "false" }
> = 
    // Multiple validation layers
    T extends any[] 
        ? T extends readonly (boolean | (() => boolean))[]
            ? number extends T["length"]
                ? boolean
                : TOpt extends { empty: infer E }
                    ? [] extends T 
                        ? E
                        : T extends readonly boolean[]
                            ? OldComplexAndProcess<T>
                            : OldComplexReduce<T> extends readonly boolean[]
                                ? OldComplexAndProcess<OldComplexReduce<T>>
                                : false
                    : [] extends T 
                        ? false
                        : T extends readonly boolean[]
                            ? OldComplexAndProcess<T>
                            : OldComplexReduce<T> extends readonly boolean[]
                                ? OldComplexAndProcess<OldComplexReduce<T>>
                                : false
            : false
        : false;

type OldComplexReduce<T extends readonly (boolean | (() => boolean))[]> = {
    [K in keyof T]: T[K] extends () => infer R ? R : T[K]
};

type OldComplexAndProcess<
    T extends readonly boolean[], 
    Result extends boolean = true,
    Index extends readonly unknown[] = []
> = Index["length"] extends T["length"]
    ? Result
    : T[Index["length"]] extends false
        ? false
        : T[Index["length"]] extends true
            ? OldComplexAndProcess<T, Result, [...Index, unknown]>
            : boolean;

// New streamlined approach (current implementation)
type NewStreamlinedAnd<T extends readonly boolean[]> = 
    number extends T["length"] ? boolean :
    [] extends T ? false :
    false extends T[number] ? false :
    boolean extends T[number] ? boolean :
    true;

// Performance comparison tests
type TestArray1 = [true, true, true, true, true];
type TestArray2 = [true, true, false, true, true];
type TestArray3 = [boolean, true, true];
type TestArray4 = [
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, false
];

// Time these type resolutions
type OldResults = [
    OldComplexAnd<TestArray1>,
    OldComplexAnd<TestArray2>, 
    OldComplexAnd<TestArray3>,
    OldComplexAnd<TestArray4>
];

type NewResults = [
    NewStreamlinedAnd<TestArray1>,
    NewStreamlinedAnd<TestArray2>,
    NewStreamlinedAnd<TestArray3>, 
    NewStreamlinedAnd<TestArray4>
];

// Verify they produce the same results
type ValidationCheck = [
    OldResults[0] extends NewResults[0] ? true : false,
    OldResults[1] extends NewResults[1] ? true : false, 
    OldResults[2] extends NewResults[2] ? true : false,
    OldResults[3] extends NewResults[3] ? true : false
];

export type {
    OldResults,
    NewResults,
    ValidationCheck
};
import { describe, it } from "vitest";
import {
    Expect,
    Test,
    ExcludeVariadicTail,
    HasVariadicTail,
    VariadicType,
    GetNonVariadicLength,
    GetOptionalElementCount,
    GetRequiredElementCount,
    SuperBad,
} from "inferred-types/types";

describe("Variadic Type Utilities", () => {

    describe("HasVariadicTail<T>", () => {

        it("returns true for tuples with variadic tails", () => {
            type T1 = HasVariadicTail<[1, 2, ...number[]]>; // =>
            type T2 = HasVariadicTail<[1, 2, string?, ...number[]]>;
            type T3 = HasVariadicTail<[boolean, ...unknown[]]>;
            type T4 = HasVariadicTail<[1, 2?, ...number[]]>;
            type T5 = HasVariadicTail<[string?, boolean?, ...number[]]>;

            type T6 = HasVariadicTail<[1, ...string[]]>;
            type T7 = HasVariadicTail<readonly [1, ...string[]]>;

            // Should return true when there IS a variadic tail
            type cases = [
                Expect<Test<T1, "equals", true>>,
                Expect<Test<T2, "equals", true>>,
                Expect<Test<T3, "equals", true>>,
                Expect<Test<T4, "equals", true>>,
                Expect<Test<T5, "equals", true>>,
                Expect<Test<T6, "equals", true>>,
                Expect<Test<T7, "equals", true>>,
            ];
        });

        it("returns false for tuples without variadic tails", () => {
            type F1 = HasVariadicTail<[1, 2, 3]>;
            type F2 = HasVariadicTail<[]>;
            type F3 = HasVariadicTail<[string, boolean]>;
            type F4 = HasVariadicTail<[1?, 2?, 3?]>;
            type F5 = HasVariadicTail<[...string[]]>; // this type is the same as string[] which is categorized as a "wide" type
            type F6 = HasVariadicTail<[]>;
            type F7 = HasVariadicTail<[1, 2, 3]>;
            type F8 = HasVariadicTail<string[]>;
            type F9 = HasVariadicTail<readonly number[]>;

            // Should return false when there's NO variadic tail
            // or when the type is classified as a "wide type"
            type cases = [
                Expect<Test<F1, "equals", false>>,
                Expect<Test<F2, "equals", false>>,
                Expect<Test<F3, "equals", false>>,
                Expect<Test<F4, "equals", false>>,
                Expect<Test<F5, "equals", false>>,
                Expect<Test<F6, "equals", false>>,
                Expect<Test<F7, "equals", false>>,
                Expect<Test<F8, "equals", false>>,
                Expect<Test<F9, "equals", false>>,
            ];
        });

        it("handles edge cases", () => {
            type E1 = HasVariadicTail<[...unknown[]]>;
            type E2 = HasVariadicTail<[1, 2, 3, 4?, 5?, ...number[]]>;
            type E3 = HasVariadicTail<[string?, boolean?, number?]>;

            type cases = [
                Expect<Test<E1, "equals", false>>, // this is the wide type `unknown[]` (although all wide types are variadic)
                Expect<Test<E2, "equals", true>>,
                Expect<Test<E3, "equals", false>>,  // No variadic tail
            ];
        });
    });


    describe("GetNonVariadicLength<T>", () => {

        it("variadic", () => {
            type NoOptional = GetNonVariadicLength<[string, boolean, ...number[]]>; // =>
            type AllOptional = GetNonVariadicLength<[string?, boolean?, ...number[]]>; // =>
            type SomeOptional = GetNonVariadicLength<[string, boolean?, ...number[]]>; // =>

            type cases = [
                Expect<Test<NoOptional, "equals", 2>>,
                Expect<Test<AllOptional, "equals", 2>>,
                Expect<Test<SomeOptional, "equals", 2>>,
            ]
        });

        it("non-variadic", () => {
            type NoOptNonVariadic = GetNonVariadicLength<[string, boolean]>;
            type AllOptNonVariadic = GetNonVariadicLength<[string?, boolean?]>;
            type SomeOptNonVariadic = GetNonVariadicLength<[string, boolean?]>;

            type cases = [
                Expect<Test<NoOptNonVariadic, "equals", 2>>,
                Expect<Test<AllOptNonVariadic, "equals", 2>>,
                Expect<Test<SomeOptNonVariadic, "equals", 2>>
            ];
        });

        it("readonly-only variadic", () => {
            type RO_NoOptional = GetNonVariadicLength<readonly [string, boolean, ...number[]]>;
            type RO_AllOptional = GetNonVariadicLength<readonly [string?, boolean?, ...number[]]>;
            type RO_SomeOptional = GetNonVariadicLength<readonly [string, boolean?, ...number[]]>;


            type cases = [
                Expect<Test<RO_NoOptional, "equals", 2>>,
                Expect<Test<RO_AllOptional, "equals", 2>>,
                Expect<Test<RO_SomeOptional, "equals", 2>>,
            ];
        });

        it("wide", () => {
            type Wide = GetNonVariadicLength<string[]>;

            type cases = [
                Expect<Test<Wide, "equals", 0>>,
            ];
        });
    })

    describe("GetOptionalElementCount<T>", () => {
        type NV_NoOptional = GetOptionalElementCount<[string, boolean]>;
        type NV_AllOptional = GetOptionalElementCount<[string?, boolean?]>;
        type NV_SomeOptional = GetOptionalElementCount<[string, boolean?]>;

        type V_NoOptional = GetOptionalElementCount<[string, boolean, ...number[]]>;
        type V_AllOptional = GetOptionalElementCount<[string?, boolean?, ...number[]]>;
        type V_SomeOptional = GetOptionalElementCount<[string, boolean?, ...number[]]>;

        type cases = [
            Expect<Test<V_NoOptional, "equals", 0>>,
            Expect<Test<V_AllOptional, "equals", 2>>,
            Expect<Test<V_SomeOptional, "equals", 1>>,

            Expect<Test<NV_NoOptional, "equals", 0>>,
            Expect<Test<NV_AllOptional, "equals", 2>>,
            Expect<Test<NV_SomeOptional, "equals", 1>>,
        ]
    })

    describe.skip("ExcludeVariadicTail<T>", () => {

        it("removes variadic tail from tuples", () => {
            type T1 = ExcludeVariadicTail<[1, 2, 3, ...number[]]>;
            type T2 = ExcludeVariadicTail<[string, boolean, ...string[]]>;
            type L3 = GetNonVariadicLength<[1, 2?, 3?, 4?, ...number[]]>; // =>
            type T3 = ExcludeVariadicTail<[1, 2?, 3?, ...number[]]>; // =>
            type T4 = ExcludeVariadicTail<["a", "b", "c", ...string[]]>;
            type T5 = ExcludeVariadicTail<[string?,number?,string?]>; // =>

            type cases = [
                Expect<Test<T1, "equals", [1, 2, 3]>>,
                Expect<Test<T2, "equals", [string, boolean]>>,
                // Should preserve optional elements: [1, 2?, 3?]
                Expect<Test<T3, "equals", [1, 2?, 3?]>>,
                Expect<Test<T4, "equals", ["a", "b", "c"]>>,
                Expect<Test<T5, "equals", [string?, number?, string?]>>
            ];
        });

        it("returns tuple unchanged when no variadic tail", () => {
            type T1 = ExcludeVariadicTail<[1, 2, 3]>;
            type T2 = ExcludeVariadicTail<[string, boolean, number]>;
            type T3 = ExcludeVariadicTail<["a", "b", "c"]>;
            type T4 = ExcludeVariadicTail<[]>;

            type cases = [
                Expect<Test<T1, "equals", [1, 2, 3]>>,
                Expect<Test<T2, "equals", [string, boolean, number]>>,
                Expect<Test<T3, "equals", ["a", "b", "c"]>>,
                Expect<Test<T4, "equals", []>>,
            ];
        });

        it("handles tuples with optional elements", () => {
            type T1 = ExcludeVariadicTail<[1, 2?, 3?]>;
            type T2 = ExcludeVariadicTail<[string, boolean?, number?]>;
            type T3 = ExcludeVariadicTail<[1?, 2?, 3?]>;
            type T4 = ExcludeVariadicTail<[1, string?, boolean?, ...number[]]>;
            type T5 = ExcludeVariadicTail<["a", "b"?, "c"?, ...string[]]>;
            type T6 = ExcludeVariadicTail<[number, string, boolean?, number?, ...unknown[]]>;

            // Should preserve optional elements
            type cases = [
                Expect<Test<T1, "equals", [1, 2?, 3?]>>,
                Expect<Test<T2, "equals", [string, boolean?, number?]>>,
                Expect<Test<T3, "equals", [1?, 2?, 3?]>>,
                Expect<Test<T4, "equals", [1, string?, boolean?]>>,
                Expect<Test<T5, "equals", ["a", "b"?, "c"?]>>,
                Expect<Test<T6, "equals", [number, string, boolean?, number?]>>,
            ];
        });

        it("handles purely variadic tuples", () => {
            type T1 = ExcludeVariadicTail<[...number[]]>;
            type T2 = ExcludeVariadicTail<[...string[]]>;
            type T3 = ExcludeVariadicTail<[...(string | number)[]]>;

            type cases = [
                Expect<Test<T1, "equals", []>>,
                Expect<Test<T2, "equals", []>>,
                Expect<Test<T3, "equals", []>>,
            ];
        });

    });



    describe.skip("VariadicType<T>", () => {

        it("returns element type for tuples with variadic tails", () => {
            type T1 = VariadicType<[1, 2, ...number[]]>;
            type T2 = VariadicType<[...string[]]>;
            type T3 = VariadicType<[boolean, string?, ...boolean[]]>;
            type T4 = VariadicType<[1, 2?, 3?, ...string[]]>;

            type cases = [
                Expect<Test<T1, "equals", number>>,
                Expect<Test<T2, "equals", string>>,
                Expect<Test<T3, "equals", boolean>>,
                Expect<Test<T4, "equals", string>>,
            ];

            // Additional working cases
            type T5 = VariadicType<[...number[]]>;
            type T6 = VariadicType<[...boolean[]]>;

            type extraCases = [
                Expect<Test<T5, "equals", number>>,
                Expect<Test<T6, "equals", boolean>>,
            ];
        });

        it("returns never for tuples without variadic tails", () => {
            type T1 = VariadicType<[]>;
            type T2 = VariadicType<[1, 2, 3]>;
            type T3 = VariadicType<[1, 2, 3?]>;
            type T4 = VariadicType<[string, boolean, number]>;
            type T5 = VariadicType<[1?, 2?, 3?]>;

            // Should return never as documented
            type cases = [
                Expect<Test<T1, "equals", never>>,
                Expect<Test<T2, "equals", never>>,
                Expect<Test<T3, "equals", never>>,
                Expect<Test<T4, "equals", never>>,
                Expect<Test<T5, "equals", never>>,
            ];
        });

        it("handles complex element types", () => {
            type T1 = VariadicType<[1, ...(string | number)[]]>;
            type T2 = VariadicType<[...Array<{ id: number; name: string }>]>;
            type T3 = VariadicType<[boolean, ...(null | undefined)[]]>;
            type T4 = VariadicType<[1, 2, ...unknown[]]>;

            type cases = [
                Expect<Test<T1, "equals", string | number>>,
                Expect<Test<T2, "equals", { id: number; name: string }>>,
                Expect<Test<T3, "equals", null | undefined>>,
                Expect<Test<T4, "equals", unknown>>,
            ];

            // Additional working cases
            type T5 = VariadicType<[...(string | number)[]]>;
            type T6 = VariadicType<[...(null | undefined)[]]>;

            type extraCases = [
                Expect<Test<T5, "equals", string | number>>,
                Expect<Test<T6, "equals", null | undefined>>,
            ];
        });

        it("handles readonly tuples", () => {
            type T1 = VariadicType<readonly [1, 2, ...number[]]>;
            type T2 = VariadicType<readonly [...string[]]>;
            type T3 = VariadicType<readonly [boolean, ...boolean[]]>;

            type cases = [
                Expect<Test<T1, "equals", number>>,
                Expect<Test<T2, "equals", string>>,
                Expect<Test<T3, "equals", boolean>>,
            ];
        });

        it("matches debug test cases from source", () => {
            // These are the test cases from the source file
            type V1 = VariadicType<[]>;
            type V2 = VariadicType<[1, 2, 3]>;
            type V3 = VariadicType<[1, 2, 3?]>;
            type V4 = VariadicType<[1, 2, ...number[]]>;
            type V5 = VariadicType<[...string[]]>;
            type V6 = VariadicType<[boolean, string?, ...boolean[]]>;
            type V7 = VariadicType<[1, 2?, 3?, ...string[]]>;

            type cases = [
                Expect<Test<V1, "equals", never>>,
                Expect<Test<V2, "equals", never>>,
                Expect<Test<V3, "equals", never>>,
                Expect<Test<V4, "equals", number>>,
                Expect<Test<V5, "equals", string>>,
                Expect<Test<V6, "equals", boolean>>,
                Expect<Test<V7, "equals", string>>,
            ];
        });
    });


});


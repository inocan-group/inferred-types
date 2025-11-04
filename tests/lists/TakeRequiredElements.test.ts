import { describe, it } from "vitest";
import type { Expect, TakeRequiredElements, Test } from "inferred-types/types";

describe("TakeRequiredElements<T>", () => {
    it("non-variadic tuples with no optional elements", () => {
        type Empty = TakeRequiredElements<[]>;
        type SingleElement = TakeRequiredElements<[string]>;
        type MultiElement = TakeRequiredElements<[string, number, boolean]>;

        type cases = [
            Expect<Test<Empty, "equals", []>>,
            Expect<Test<SingleElement, "equals", [string]>>,
            Expect<Test<MultiElement, "equals", [string, number, boolean]>>,
        ];
    });

    it("non-variadic tuples with all optional elements", () => {
        type SingleOptional = TakeRequiredElements<[string?]>;
        type MultiOptional = TakeRequiredElements<[string?, number?, boolean?]>;

        type cases = [
            Expect<Test<SingleOptional, "equals", []>>,
            Expect<Test<MultiOptional, "equals", []>>,
        ];
    });

    it("non-variadic tuples with some optional elements", () => {
        type OneReqOneOpt = TakeRequiredElements<[string, number?]>;
        type TwoReqOneOpt = TakeRequiredElements<[string, number, boolean?]>;
        type OneReqTwoOpt = TakeRequiredElements<[string, number?, boolean?]>;

        type cases = [
            Expect<Test<OneReqOneOpt, "equals", [string]>>,
            Expect<Test<TwoReqOneOpt, "equals", [string, number]>>,
            Expect<Test<OneReqTwoOpt, "equals", [string]>>,
        ];
    });

    it("variadic tuples with no optional elements", () => {
        type TrailingVariadic = TakeRequiredElements<[string, number, ...boolean[]]>;
        type OnlyVariadic = TakeRequiredElements<string[]>;

        type cases = [
            Expect<Test<TrailingVariadic, "equals", [string, number, ...boolean[]]>>,
            Expect<Test<OnlyVariadic, "equals", string[]>>,
        ];
    });

    it("variadic tuples with all optional elements", () => {
        type AllOptionalNoVariadic = TakeRequiredElements<[string?, number?]>;

        type cases = [
            Expect<Test<AllOptionalNoVariadic, "equals", []>>,
        ];
    });

    it("variadic tuples with some optional elements", () => {
        type MixedTrailingVariadic = TakeRequiredElements<[string, number?, ...boolean[]]>;

        type cases = [
            Expect<Test<MixedTrailingVariadic, "equals", [string]>>,
        ];
    });

    it("edge cases", () => {
        type EmptyArray = TakeRequiredElements<[]>;
        type SingleRequired = TakeRequiredElements<[string]>;
        type MultipleRequired = TakeRequiredElements<[string, number, boolean]>;

        type cases = [
            Expect<Test<EmptyArray, "equals", []>>,
            Expect<Test<SingleRequired, "equals", [string]>>,
            Expect<Test<MultipleRequired, "equals", [string, number, boolean]>>,
        ];
    });

    it("readonly tuples", () => {
        type ReadonlyNoOpt = TakeRequiredElements<readonly [string, number]>;
        type ReadonlyWithOpt = TakeRequiredElements<readonly [string, number?]>;
        type ReadonlyAllOpt = TakeRequiredElements<readonly [string?, number?]>;

        type cases = [
            Expect<Test<ReadonlyNoOpt, "equals", readonly [string, number]>>,
            // SliceArray returns mutable tuples even from readonly input
            Expect<Test<ReadonlyWithOpt, "equals", [string]>>,
            Expect<Test<ReadonlyAllOpt, "equals", []>>,
        ];
    });

    it("complex nested types", () => {
        type NestedObjects = TakeRequiredElements<[{ a: string }, { b: number }?]>;
        type NestedArrays = TakeRequiredElements<[string[], number[]?]>;
        type UnionTypes = TakeRequiredElements<[string | number, boolean?]>;

        type cases = [
            Expect<Test<NestedObjects, "equals", [{ a: string }]>>,
            Expect<Test<NestedArrays, "equals", [string[]]>>,
            Expect<Test<UnionTypes, "equals", [string | number]>>,
        ];
    });
});

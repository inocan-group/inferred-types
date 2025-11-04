import { describe, it } from "vitest";
import type { Expect, TakeOptionalElements, Test } from "inferred-types/types";

describe("TakeOptionalElements<T>", () => {
    it("non-variadic tuples with no optional elements", () => {
        type Empty = TakeOptionalElements<[]>;
        type SingleElement = TakeOptionalElements<[string]>;
        type MultiElement = TakeOptionalElements<[string, number, boolean]>;

        type cases = [
            Expect<Test<Empty, "equals", []>>,
            Expect<Test<SingleElement, "equals", [string]>>,
            Expect<Test<MultiElement, "equals", [string, number, boolean]>>,
        ];
    });

    it("non-variadic tuples with all optional elements", () => {
        type SingleOptional = TakeOptionalElements<[string?]>;
        type MultiOptional = TakeOptionalElements<[string?, number?, boolean?]>;

        type cases = [
            Expect<Test<SingleOptional, "equals", [string?]>>,
            Expect<Test<MultiOptional, "equals", [string?, number?, boolean?]>>,
        ];
    });

    it("non-variadic tuples with some optional elements", () => {
        type OneReqOneOpt = TakeOptionalElements<[string, number?]>;
        type TwoReqOneOpt = TakeOptionalElements<[string, number, boolean?]>;
        type OneReqTwoOpt = TakeOptionalElements<[string, number?, boolean?]>;

        type cases = [
            Expect<Test<OneReqOneOpt, "equals", [number?]>>,
            Expect<Test<TwoReqOneOpt, "equals", [boolean?]>>,
            Expect<Test<OneReqTwoOpt, "equals", [number?, boolean?]>>,
        ];
    });

    it("variadic tuples with no optional elements", () => {
        type TrailingVariadic = TakeOptionalElements<[string, number, ...boolean[]]>;
        type OnlyVariadic = TakeOptionalElements<string[]>;

        type cases = [
            Expect<Test<TrailingVariadic, "equals", [string, number, ...boolean[]]>>,
            Expect<Test<OnlyVariadic, "equals", string[]>>,
        ];
    });

    it("variadic tuples with all optional elements", () => {
        type AllOptionalNoVariadic = TakeOptionalElements<[string?, number?]>;
        type AllOptionalThree = TakeOptionalElements<[string?, number?, boolean?]>;

        type cases = [
            Expect<Test<AllOptionalNoVariadic, "equals", [string?, number?]>>,
            Expect<Test<AllOptionalThree, "equals", [string?, number?, boolean?]>>,
        ];
    });

    it("variadic tuples with some optional elements", () => {
        type MixedTrailingVariadic = TakeOptionalElements<[string, number?, ...boolean[]]>;
        type TwoReqOneOptVariadic = TakeOptionalElements<[string, number, boolean?, ...symbol[]]>;

        type cases = [
            Expect<Test<MixedTrailingVariadic, "equals", [number?]>>,
            Expect<Test<TwoReqOneOptVariadic, "equals", [boolean?]>>,
        ];
    });

    it("edge cases", () => {
        type EmptyArray = TakeOptionalElements<[]>;
        type SingleRequired = TakeOptionalElements<[string]>;
        type MultipleRequired = TakeOptionalElements<[string, number, boolean]>;

        type cases = [
            Expect<Test<EmptyArray, "equals", []>>,
            Expect<Test<SingleRequired, "equals", [string]>>,
            Expect<Test<MultipleRequired, "equals", [string, number, boolean]>>,
        ];
    });

    it("readonly tuples", () => {
        type ReadonlyNoOpt = TakeOptionalElements<readonly [string, number]>;
        type ReadonlyWithOpt = TakeOptionalElements<readonly [string, number?]>;
        type ReadonlyAllOpt = TakeOptionalElements<readonly [string?, number?]>;

        type cases = [
            Expect<Test<ReadonlyNoOpt, "equals", readonly [string, number]>>,
            // SliceArray returns mutable tuples even from readonly input
            Expect<Test<ReadonlyWithOpt, "equals", [number?]>>,
            Expect<Test<ReadonlyAllOpt, "equals", [string?, number?]>>,
        ];
    });

    it("complex nested types", () => {
        type NestedObjects = TakeOptionalElements<[{ a: string }, { b: number }?]>;
        type NestedArrays = TakeOptionalElements<[string[], number[]?]>;
        type UnionTypes = TakeOptionalElements<[string | number, boolean?]>;

        type cases = [
            Expect<Test<NestedObjects, "equals", [{ b: number }?]>>,
            Expect<Test<NestedArrays, "equals", [number[]?]>>,
            Expect<Test<UnionTypes, "equals", [boolean?]>>,
        ];
    });
});

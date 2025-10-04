import { describe, it } from "vitest";
import type { Expect, Test, TypedFunction, OnlyFn } from "inferred-types/types";

describe("OnlyFn<T>", () => {

    it("identity function", () => {
        type Identity = () => "hi";
        type Result = OnlyFn<Identity>;

        type cases = [
            Expect<Test<Result, "equals", () => "hi">>
        ];
    });

    it("function with parameters", () => {
        type FnWithParams = (name: string, age: number) => `Hi ${typeof name}, you are ${typeof age} years old`;
        type Result = OnlyFn<FnWithParams>;

        type cases = [
            Expect<Test<
                Result, "equals",
                (name: string, age: number) => `Hi ${string}, you are ${number} years old`
            >>
        ];
    });

    it("narrowing function", () => {
        type NarrowingFn = <TName extends string, TAge extends number>(name: TName, age: TAge) => `Hi ${TName}, you are ${TAge} years old`;
        type Result = OnlyFn<NarrowingFn>;

        type cases = [
            Expect<Test<Result, "equals", <TName extends string, TAge extends number>(name: TName, age: TAge) => `Hi ${TName}, you are ${TAge} years old`>>
        ];
    });

    it("function with rest parameters", () => {
        type RestFn = (...args: string[]) => number;
        type Result = OnlyFn<RestFn>;

        type cases = [
            Expect<Test<Result, "equals", (...args: string[]) => number>>
        ];
    });

    it("async function", () => {
        type AsyncFn = (id: string) => Promise<{ id: string; name: string }>;
        type Result = OnlyFn<AsyncFn>;

        type cases = [
            Expect<Test<Result, "equals", (id: string) => Promise<{ id: string; name: string }>>>
        ];
    });

    it("function with properties (TypedFunction)", () => {
        type FnWithProps = TypedFunction<[string, number], string> & {
            version: 1;
            metadata: { author: string };
        };
        type Result = OnlyFn<FnWithProps>;

        type cases = [
            Expect<Test<Result, "equals", (string, number) => string>>
        ];
    });

    it("plain Function (non-TypedFunction)", () => {
        type PlainFunction = Function;
        type Result = OnlyFn<PlainFunction>;

        type cases = [
            Expect<Test<Result, "equals", Function>>
        ];
    });

    it("function with optional parameters", () => {
        type OptionalParamsFn = (name: string, age?: number) => string;
        type Result = OnlyFn<OptionalParamsFn>;

        type cases = [
            Expect<Test<Result, "equals", (name: string, age?: number) => string>>
        ];
    });

    it("function with default parameters", () => {
        type DefaultParamsFn = (name: string, age: number) => string;
        type Result = OnlyFn<DefaultParamsFn>;

        type cases = [
            Expect<Test<Result, "equals", (name: string, age: number) => string>>
        ];
    });

    it("generic function", () => {
        type GenericFn = <T>(value: T) => T;
        type Result = OnlyFn<GenericFn>;

        type cases = [
            Expect<Test<Result, "equals", <T>(value: T) => T>>
        ];
    });

    it("function with union return type", () => {
        type UnionReturnFn = (input: string) => string | number;
        type Result = OnlyFn<UnionReturnFn>;

        type cases = [
            Expect<Test<Result, "equals", (input: string) => string | number>>
        ];
    });

    it("function with intersection parameter type", () => {
        type IntersectionParamFn = (obj: { name: string } & { age: number }) => boolean;
        type Result = OnlyFn<IntersectionParamFn>;

        type cases = [
            Expect<Test<Result, "equals", (obj: { name: string } & { age: number }) => boolean>>
        ];
    });

    it("function with tuple parameters", () => {
        type TupleParamsFn = (...args: [string, number, boolean]) => void;
        type Result = OnlyFn<TupleParamsFn>;

        type cases = [
            Expect<Test<Result, "equals", (...args: [string, number, boolean]) => void>>
        ];
    });

    it("function with readonly tuple parameters", () => {
        type ReadonlyTupleParamsFn = (...args: readonly [string, number]) => string;
        type Result = OnlyFn<ReadonlyTupleParamsFn>;

        type cases = [
            Expect<Test<Result, "equals", (...args: readonly [string, number]) => string>>
        ];
    });

    it("complex function with multiple constraints", () => {
        type ComplexFn = <T extends { id: string }, U extends number[]>(obj: T, ...values: U) => {
            id: T["id"];
            sum: U[number];
        };
        type Result = OnlyFn<ComplexFn>;

        type cases = [
            Expect<Test<Result, "equals", <T extends { id: string }, U extends number[]>(obj: T, ...values: U) => {
                id: T["id"];
                sum: U[number];
            }>>
        ];
    });

});

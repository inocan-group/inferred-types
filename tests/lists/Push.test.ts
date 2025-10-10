import { describe, it } from "vitest";
import {
    Expect,
    Push,
    Test,
} from "inferred-types/types";

describe("Push<TList, TVal, [TCond]>", () => {

    it("pushing string literals onto an array", () => {
        type Empty = [];
        type One = Push<Empty, "foo">;
        type Two = Push<One, "bar">;
        type Three = Push<Two, "baz">;

        type cases = [
            Expect<Test<One, "equals", ["foo"]>>,
            Expect<Test<Two, "equals", ["foo", "bar"]>>,
            Expect<Test<Three, "equals", ["foo", "bar", "baz"]>>,
        ];
    });

    it("pushing number literals onto an array", () => {
        type Empty = [];
        type One = Push<Empty, 1>;
        type Two = Push<One, 2>;
        type Three = Push<Two, 3>;

        type cases = [
            Expect<Test<One, "equals", [1]>>,
            Expect<Test<Two, "equals", [1, 2]>>,
            Expect<Test<Three, "equals", [1, 2, 3]>>,
        ];
    });

    it("pushing mixed types onto an array", () => {
        type Empty = [];
        type One = Push<Empty, "foo">;
        type Two = Push<One, 42>;
        type Three = Push<Two, true>;
        type Four = Push<Three, { name: "test" }>;

        type cases = [
            Expect<Test<One, "equals", ["foo"]>>,
            Expect<Test<Two, "equals", ["foo", 42]>>,
            Expect<Test<Three, "equals", ["foo", 42, true]>>,
            Expect<Test<Four, "equals", ["foo", 42, true, { name: "test" }]>>,
        ];
    });

    it("pushing onto a non-empty array", () => {
        type Start = ["a", "b", "c"];
        type Result = Push<Start, "d">;

        type cases = [
            Expect<Test<Result, "equals", ["a", "b", "c", "d"]>>,
        ];
    });

    it("pushing objects onto an array", () => {
        type Obj1 = { id: 1; name: "Alice" };
        type Obj2 = { id: 2; name: "Bob" };
        type Empty = [];
        type One = Push<Empty, Obj1>;
        type Two = Push<One, Obj2>;

        type cases = [
            Expect<Test<One, "equals", [Obj1]>>,
            Expect<Test<Two, "equals", [Obj1, Obj2]>>,
        ];
    });

    it("pushing an array onto a multidimensional array", () => {
        type A = [];
        type B = Push<A, ["foo","bar","baz"]>;
        type C = Push<B, [1,2,3]>;

        type cases = [
            Expect<Test<
                C,
                "equals",
                 [ ["foo","bar","baz"],  [1,2,3]]
            >>,
        ];
    });

    it("conditional push with TCondition = false", () => {
        type Start =  ["a", "b"];
        type NoChange = Push<Start, "c", false>;

        type cases = [
            // When condition is false, array should remain unchanged
            Expect<Test<NoChange, "equals",  ["a", "b"]>>,
        ];
    });

    it("conditional push with TCondition = true (explicit)", () => {
        type Start =  ["a", "b"];
        type Changed = Push<Start, "c", true>;

        type cases = [
            // When condition is true, should push the value
            Expect<Test<Changed, "equals",  ["a", "b", "c"]>>,
        ];
    });

    it("pushing undefined onto an array", () => {
        type Start =  [1, 2];
        type Result = Push<Start, undefined>;

        type cases = [
            Expect<Test<Result, "equals",  [1, 2, undefined]>>,
        ];
    });

    it("pushing null onto an array", () => {
        type Start =  ["a", "b"];
        type Result = Push<Start, null>;

        type cases = [
            Expect<Test<Result, "equals",  ["a", "b", null]>>,
        ];
    });

    it("pushing union types onto an array", () => {
        type Start = readonly [1, 2];
        type Result = Push<Start, string | number>;

        type cases = [
            Expect<Test<Result, "equals", [1, 2, string | number]>>,
        ];
    });

    it("pushing literal union onto an array", () => {
        type Start = readonly ["x"];
        type Result = Push<Start, "a" | "b" | "c">;

        type cases = [
            Expect<Test<Result, "equals",  ["x", "a" | "b" | "c"]>>,
        ];
    });

    it("preserves narrow literal types", () => {
        type Empty = [];
        type Result = Push<Empty, "hello">;

        type cases = [
            // Should preserve "hello" as literal, not widen to string
            Expect<Test<Result, "equals",  ["hello"]>>,
        ];
    });

    it("pushing tuples onto an array", () => {
        type Start = readonly [[1, 2]];
        type Result = Push<Start, [3, 4]>;

        type cases = [
            Expect<Test<Result, "equals",  [ [1, 2],  [3, 4]]>>,
        ];
    });

    it("building a complex nested structure", () => {
        type Empty = [];
        type Step1 = Push<Empty, { id: 1; data: [1, 2, 3] }>;
        type Step2 = Push<Step1, { id: 2; data: ["a", "b"] }>;
        type Step3 = Push<Step2, { id: 3; data: [true, false] }>;

        type cases = [
            Expect<Test<
                Step3,
                "equals",
                [
                    { id: 1; data: [1, 2, 3] },
                    { id: 2; data: ["a", "b"] },
                    { id: 3; data: [true, false] }
                ]
            >>,
        ];
    });

    it("chaining multiple pushes", () => {
        type Result = Push<
            Push<
                Push<
                    Push<[], 1>,
                    2
                >,
                3
            >,
            4
        >;

        type cases = [
            Expect<Test<Result, "equals",  [1, 2, 3, 4]>>,
        ];
    });

    it("pushing wide types onto an array", () => {
        type Start = readonly [1];
        type WithString = Push<Start, string>;
        type WithNumber = Push<WithString, number>;
        type WithBoolean = Push<WithNumber, boolean>;

        type cases = [
            Expect<Test<WithString, "equals", [1, string]>>,
            Expect<Test<WithNumber, "equals", [1, string, number]>>,
            Expect<Test<WithBoolean, "equals", [1, string, number, boolean]>>,
        ];
    });

    it("result maintains readonly property", () => {
        type Start = readonly [1, 2, 3];
        type Result = Push<Start, 4>;

        type cases = [
            // The result should be readonly
            Expect<Test<Result, "extends", readonly unknown[]>>,
        ];
    });

    it("pushing arrays with different element types", () => {
        type Empty = [];
        type Numbers = Push<Empty, readonly number[]>;
        type Strings = Push<Numbers, readonly string[]>;

        type cases = [
            Expect<Test<Numbers, "equals", [readonly number[]]>>,
            Expect<Test<Strings, "equals", [readonly number[], readonly string[]]>>,
        ];
    });

    it("conditional push with boolean literal false", () => {
        type Start = readonly [1, 2, 3];
        type Unchanged = Push<Start, 999, false>;

        type cases = [
            Expect<Test<Unchanged, "equals", readonly [1, 2, 3]>>,
        ];
    });

    it("conditional push based on type computation", () => {
        type IsTrue = true;
        type IsFalse = false;

        type Start = readonly ["a"];
        type WhenTrue = Push<Start, "b", IsTrue>;
        type WhenFalse = Push<Start, "c", IsFalse>;

        type cases = [
            Expect<Test<WhenTrue, "equals", ["a", "b"]>>,
            Expect<Test<WhenFalse, "equals", readonly ["a"]>>,
        ];
    });

});

import { describe, it } from "vitest";
import type { Expect, Test, TupleToUnion, UnionArrayToTuple, UnionToTuple, UnionToTuple__PreserveBoolean } from "inferred-types/types";
import { AssertEqual, AssertSameValues } from "transpiled";

describe("UnionToTuple<U>", () => {

    it("happy path", () => {
        type Foobar = UnionToTuple<"foo" | "bar">;
        type OneTwoThree = UnionToTuple<1 | 2 | 3>;
        type Mixed = UnionToTuple<1 | 2 | "foo" | "bar">;

        type cases = [
            Expect<Test<Foobar, "hasSameValues", ["foo", "bar"]>>,
            Expect<Test<OneTwoThree, "hasSameValues", [1, 2, 3]>>,
            Expect<Test<Mixed, "hasSameValues", [1, 2, "foo", "bar"]>>,
        ];
    });

    it("unions with boolean", () => {
        type StrBool = UnionToTuple<"foo" | "bar" | boolean>;
        type Wide = UnionToTuple<string | boolean>;

        type cases = [
            Expect<Test<StrBool, "hasSameValues", ["foo", "bar", true, false]>>,
            Expect<Test<Wide, "hasSameValues", [string, true, false]>>
        ];
    });

    it("will convert a Union array into a tuple", () => {
        type UnionArr = (1 | 2 | 3)[];
        type Tup = UnionArrayToTuple<UnionArr>;

        type cases = [
            // array order CAN vary
            Expect<Test<Tup, "hasSameValues", [1, 2, 3]>>
        ];
    });


    it("tuple literals elements", () => {
        type U2 = [1,2,3] | [4,5,6];
        type T2 = UnionToTuple<U2>;

        type cases = [
            Expect<AssertSameValues<
                T2,
                [ [1,2,3], [4,5,6] ]
            >>,
        ];
    });


    it("tuple literals combined with wide arrays", () => {
        type U1 = [1,2,3] | string[] | number[];
        type T1 = UnionToTuple<U1>;

        type cases = [
            // Use "hasSameValues" since union order is non-deterministic
            Expect<Test<T1, "hasSameValues", [[1,2,3], string[], number[]]>>
        ];
    });


    it("readonly tuple literals", () => {
        type U = readonly [1, 2, 3] | readonly [4,5,6];
        type T1 = UnionToTuple<U>;

        type cases = [

            Expect<AssertSameValues<
                T1,
                [ readonly [1,2,3], readonly [4,5,6] ]
            >>
        ];
    });


    it("readonly tuple literals combined with wide arrays", () => {
        type U1 = readonly [1, 2, 3] | readonly string[] | readonly number[];
        type T1 = UnionToTuple<U1>;

        type cases = [
           Expect<AssertSameValues<
                T1,
                [readonly [1, 2, 3], readonly string[], readonly number[]]
            >>,
        ];
    });


});

describe("UnionToTuple__PreserveBoolean<T>", () => {

    it("happy path", () => {
        type Foobar = UnionToTuple__PreserveBoolean<"foo" | "bar">;
        type OneTwoThree = UnionToTuple__PreserveBoolean<1 | 2 | 3>;
        type Mixed = UnionToTuple__PreserveBoolean<1 | 2 | "foo" | "bar">;

        type cases = [
            Expect<Test<Foobar, "hasSameValues", ["foo", "bar"]>>,
            Expect<Test<OneTwoThree, "hasSameValues", [1, 2, 3]>>,
            Expect<Test<Mixed, "hasSameValues", [1, 2, "foo", "bar"]>>,
        ];
    });

    it("unions with boolean", () => {
        type StrBool = UnionToTuple__PreserveBoolean<"foo" | "bar" | boolean>;
        type Wide = UnionToTuple__PreserveBoolean<string | boolean>;

        type cases = [
            Expect<Test<StrBool, "hasSameValues", ["foo", "bar", boolean]>>,
            Expect<Test<Wide, "hasSameValues", [string, boolean]>>
        ];
    });



    it("readonly modifier is preserved", () => {
        type U1 = readonly [1, 2, 3] | readonly string[] | readonly number[];
        type T1 = UnionToTuple__PreserveBoolean<U1>;

        type U2 = readonly [1, 2, 3] | readonly string[];
        type T2 = UnionToTuple__PreserveBoolean<U2>;

        type cases = [
            Expect<AssertSameValues<
                T1,
                [readonly [1, 2, 3], readonly string[], readonly number[]]
            >>,
            Expect<AssertSameValues<
                T2,
                [readonly [1,2,3], readonly string[]]
            >>
        ];
    });
})

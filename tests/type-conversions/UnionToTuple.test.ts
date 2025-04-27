import { describe, it } from "vitest";
import {
    Expect,
    UnionToTuple,
    UnionArrayToTuple,
    Test
} from "inferred-types/types";



describe("UnionToTuple<U>", () => {

    it("happy path", () => {
        type Foobar = UnionToTuple<"foo" | "bar">;
        type OneTwoThree = UnionToTuple<1 | 2 | 3>;
        type Mixed = UnionToTuple<1 | 2 | "foo" | "bar">;

        type cases = [
            Expect<Test<Foobar, "hasSameKeys", ["foo", "bar"]>>,
            Expect<Test<OneTwoThree, "hasSameKeys", [1, 2, 3]>>,
            Expect<Test<Mixed, "hasSameKeys", [1, 2, "foo", "bar"]>>,
        ];
    });


    it("unions with boolean", () => {
        type StrBool = UnionToTuple<"foo" | "bar" | boolean>;
        type Wide = UnionToTuple<string | boolean>;

        type cases = [
            Expect<Test<StrBool, "equals", ["foo", "bar", boolean]>>,
            Expect<Test<Wide, "equals", [string, boolean]>>
        ];
    });


    it("will convert a Union array into a tuple correctly", () => {
        type UnionArr = (1 | 2 | 3)[];
        type Tup = UnionArrayToTuple<UnionArr>;

        type cases = [
            Expect<Test<Tup, "equals", [1, 2, 3]>>
        ];
    });
});

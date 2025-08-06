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
});

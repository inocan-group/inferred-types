import { describe, it } from "vitest";
import { Expect, Pop, Shift, Test } from "inferred-types/types";



describe("Pop", () => {

    it("happy path", () => {
        type Numeric = Pop<[1, 2, 3]>;
        type Str = Pop<["foo", "bar", "baz"]>;
        type Last = Pop<[1]>;
        type Empty = Pop<[]>;

        type cases = [
            Expect<Test<Numeric, "equals", [1, 2]>>,
            Expect<Test<Str, "equals", ["foo", "bar"]>>,
            Expect<Test<Last, "equals", []>>,
            Expect<Test<Empty, "equals", []>>,
        ];
    });

    it("Pop<string literal>", () => {
        type Foobar = Pop<"foobar">;
        type Empty = Pop<"">;
        type Wide = Pop<string>;
        type Single = Pop<"f">;

        type cases = [
            Expect<Test<Foobar, "equals", "fooba">>,
            Expect<Test<Empty, "equals", "">>,
            Expect<Test<Wide, "equals", string>>,
            Expect<Test<Single, "equals", "">>,
        ];

    });
});


describe("Shift", () => {

    it("happy path", () => {
        type Numeric = Shift<[1, 2, 3]>;
        type Str = Shift<["foo", "bar", "baz"]>;
        type Last = Shift<[1]>;
        type Empty = Shift<[]>;

        type cases = [
            Expect<Test<Numeric, "equals", [2, 3]>>,
            Expect<Test<Str, "equals", ["bar", "baz"]>>,
            Expect<Test<Last, "equals", []>>,
            Expect<Test<Empty, "equals", undefined>>,
        ];
    });


    it("shift character off of string", () => {
        type Foobar = Shift<"foobar">;
        type Empty = Shift<"">;
        type Wide = Shift<string>;
        type Single = Shift<"f">;

        type cases = [
            Expect<Test<Foobar, "equals", "oobar">>,
            Expect<Test<Empty, "equals", undefined>>,
            Expect<Test<Wide, "equals", string>>,
            Expect<Test<Single, "equals", "">>,
        ];
    });

});

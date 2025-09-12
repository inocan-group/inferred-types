import { describe, it } from "vitest";
import type { Expect, IsEqual, Pop, Shift, Test, VariadicType } from "inferred-types/types";

describe("Pop", () => {

    describe("array", () => {

        it("happy path", () => {
            type Numeric = Pop<[1, 2, 3]>;
            type Str = Pop<["foo", "bar", "baz"]>;
            type Last = Pop<[1]>;
            type Empty = Pop<[]>;
            type Wide = Pop<string[]>;

            type cases = [
                Expect<Test<Numeric, "equals", [1, 2]>>,
                Expect<Test<Str, "equals", ["foo", "bar"]>>,
                Expect<Test<Last, "equals", []>>,
                Expect<Test<Empty, "equals", []>>,
                Expect<Test<Wide, "equals", string[]>>,
            ];
        });

        it("pop with optional", () => {
            type One = Pop<["foo", "bar", "baz"?]>;
            type Two = Pop<["foo", "bar"?, "baz"?]>;

            type cases = [
                Expect<Test<One, "equals", ["foo","bar"] | ["foo"]>>,
                Expect<Test<Two, "equals", ["foo","bar"] | ["foo"] | []>>,
            ];
        });

        it("pop with variadic tail", () => {
            type NonMatchedVariadic = Pop<[1,2,3, ...string[]]>;
            // when the last fixed parameter matches the variadic type then we can
            // produce a non-union type that could in a few cases be lossy but
            // it's always a valid type and it avoids a union so that is preferred
            type MatchedVariadic = Pop<["foo","bar","baz", ...string[]]>;

            type cases = [
                Expect<Test<NonMatchedVariadic, "equals", [1, 2, 3, ...string[]] | [1, 2, ...string[]]>>,
                Expect<Test<MatchedVariadic, "equals", ["foo", "bar", ...string[]]>>,
            ];
        });
    })

    describe("string", () => {
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
    })

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

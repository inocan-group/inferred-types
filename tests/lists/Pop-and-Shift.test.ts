import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { Pop, Shift } from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Pop", () => {

    it("happy path", () => {
        type Numeric = Pop<[1, 2, 3]>;
        type Str = Pop<["foo", "bar", "baz"]>;
        type Last = Pop<[1]>;
        type Empty = Pop<[]>;

        type cases = [
            Expect<Equal<Numeric, [1, 2]>>,
            Expect<Equal<Str, ["foo", "bar"]>>,
            Expect<Equal<Last, []>>,
            Expect<Equal<Empty, never>>,
        ];
        const cases: cases = [true, true, true, true];
    });



    it("Pop<string literal>", () => {
        type Foobar = Pop<"foobar">;
        type Empty = Pop<"">;
        type Wide = Pop<string>;
        type Single = Pop<"f">;

        type cases = [
            Expect<Equal<Foobar, "fooba">>,
            Expect<Equal<Empty, "">>,
            Expect<Equal<Wide, string>>,
            Expect<Equal<Single, "">>,
        ];
        const cases: cases = [true, true, true, true];

    });


});


describe("Shift", () => {

    it("happy path", () => {
        type Numeric = Shift<[1, 2, 3]>;
        type Str = Shift<["foo", "bar", "baz"]>;
        type Last = Shift<[1]>;
        type Empty = Shift<[]>;

        type cases = [
            Expect<Equal<Numeric, [2, 3]>>,
            Expect<Equal<Str, ["bar", "baz"]>>,
            Expect<Equal<Last, []>>,
            Expect<Equal<Empty, undefined>>,
        ];
        const cases: cases = [true, true, true, true];
    });


    it("shift character off of string", () => {
        type Foobar = Shift<"foobar">;
        type Empty = Shift<"">;
        type Wide = Shift<string>;
        type Single = Shift<"f">;

        type cases = [
            Expect<Equal<Foobar, "oobar">>,
            Expect<Equal<Empty, undefined>>,
            Expect<Equal<Wide, string>>,
            Expect<Equal<Single, "">>,
        ];
        const cases: cases = [true, true, true, true];

    });


});

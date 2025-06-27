import { trim, trimEnd, trimStart } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";
import { Expect, Test, Trim, TrimLeft, TrimRight } from "inferred-types/types";

describe("Trim<T> and trim()", () => {

    it("type tests", () => {
        type Leading = Trim<"  foobar">;
        type Trailing = Trim<"foobar  ">;
        type BothSides = Trim<"  foobar    ">;
        type Special = Trim<"\n\t foobar\n">;
        type Empty = Trim<"">;
        type Wide = Trim<string>;

        type cases = [
            Expect<Test<Leading, "equals", "foobar">>,
            Expect<Test<Trailing, "equals", "foobar">>,
            Expect<Test<BothSides, "equals", "foobar">>,
            Expect<Test<Special, "equals", "foobar">>,
            Expect<Test<Empty, "equals", "">>,
            Expect<Test<Wide, "equals", string>>,
        ];
    });


    it("runtime tests", () => {
        const foobar = trim("  foobar  ");

        expect(foobar).toBe("foobar");

        type cases = [
            Expect<Test<typeof foobar, "equals", "foobar">>
        ];
    });

});


describe("TrimLeft<T>", () => {

    it("type tests", () => {
        type Leading = TrimLeft<"  foobar">;
        type Trailing = TrimLeft<"foobar ">;
        type BothSides = TrimLeft<"  foobar ">;

        type cases = [
            Expect<Test<Leading, "equals", "foobar">>,
            Expect<Test<Trailing, "equals", "foobar ">>,
            Expect<Test<BothSides, "equals", "foobar ">>,
        ];
    });


    it("runtime tests", () => {
        const foobar = trimStart("  foobar ");
        const foobar2 = trimStart("  foobar ");

        expect(foobar).toBe("foobar ");
        expect(foobar2).toBe("foobar ");

        type cases = [
            Expect<Test<typeof foobar, "equals", "foobar ">>,
            Expect<Test<typeof foobar2, "equals", "foobar ">>,
        ];
    });


});

describe("TrimRight<T>", () => {

    it("type tests", () => {
        type Leading = TrimRight<" foobar">;
        type Trailing = TrimRight<"foobar  ">;
        type BothSides = TrimRight<" foobar    ">;

        type cases = [
            Expect<Test<Leading, "equals", " foobar">>,
            Expect<Test<Trailing, "equals", "foobar">>,
            Expect<Test<BothSides, "equals", " foobar">>,
        ];
    });


    it("runtime tests", () => {
        const foobar = trimEnd(" foobar ");

        expect(foobar).toBe(" foobar");

        type cases = [
            Expect<Test<typeof foobar, "equals", " foobar">>,
        ];
    });


});

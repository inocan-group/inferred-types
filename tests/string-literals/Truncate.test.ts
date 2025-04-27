import { describe, expect, it } from "vitest";
import { Expect, Test, Truncate } from "inferred-types/types";
import { truncate } from "inferred-types/runtime";

describe("Truncate<T>", () => {

    it("happy path for truncating strings", () => {
        type NoTrunc = Truncate<"Foobar", 10>;
        type Trunc = Truncate<"Foobar", 3>;
        type TruncWithEllipsis = Truncate<"Foobar", 3, true>;
        type CustomEllipsis = Truncate<"Foobar", 3, "... more">;

        type cases = [
            Expect<Test<NoTrunc, "equals", "Foobar">>,
            Expect<Test<Trunc, "equals", "Foo">>,
            Expect<Test<TruncWithEllipsis, "equals", "Foo...">>,
            Expect<Test<CustomEllipsis, "equals", "Foo... more">>,
        ];
    });

});

describe("truncate()", () => {

    it("Happy Path", () => {
        const noTrunc = truncate("Foobar", 10);
        const trunc = truncate("Foobar", 3);
        const truncWithEllipsis = truncate("Foobar", 3, true);
        const customEllipsis = truncate("Foobar", 3, "... more");

        expect(noTrunc).toEqual("Foobar");
        expect(trunc).toEqual("Foo");
        expect(truncWithEllipsis).toEqual("Foo...");
        expect(customEllipsis).toEqual("Foo... more");

    });

});

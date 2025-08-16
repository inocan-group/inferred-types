import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { EndsWith } from "inferred-types/types";
import { describe, it } from "vitest";



describe("EndsWith<TValue,TTest>", () => {

    it("happy path", () => {
        type Bar = EndsWith<"foobar", "bar">;
        type NoBar = EndsWith<"barfoo", "bar">;

        type MultiFoo = EndsWith<"foobar", ["foo", "bar"]>;
        type NotMultiFoo = EndsWith<"foobar", ["foo", "baz"]>;

        type Num = EndsWith<420, 20>;
        type NotNum = EndsWith<520, 42>;

        type cases = [
            ExpectTrue<Bar>,
            ExpectFalse<NoBar>,

            ExpectTrue<MultiFoo>,
            ExpectFalse<NotMultiFoo>,

            ExpectTrue<Num>,
            ExpectFalse<NotNum>
        ];

    });

});

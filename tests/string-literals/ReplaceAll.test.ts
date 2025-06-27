import { Expect, ReplaceAll, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ReplaceAll<TText,TFind,TReplace>", () => {

    it("single text element", () => {
        type FooBaz = ReplaceAll<"FooBar", "Bar", "Baz">;
        type Three = ReplaceAll<"FooBarFoo", "Foo", "Bar">;

        type cases = [
            Expect<Test<FooBaz, "equals", "FooBaz">>,
            Expect<Test<Three, "equals", "BarBarBar">>,
        ];
    });


    it("multiple text elements", () => {
        type Foo = ReplaceAll<["Foo", "Bar"], "Bar", "Foo">

        type cases = [
            Expect<Test<Foo, "equals", ["Foo", "Foo"]>>
        ];
    });

});

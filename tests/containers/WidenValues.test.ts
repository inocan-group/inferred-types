import { Expect, HasSameValues, Test, WidenValues } from "inferred-types/types";
import { describe, it } from "vitest";



describe("WidenValues<T>", () => {

    it("with a tuple container", () => {
        type Str = WidenValues<["foo", "bar"]>;
        type MixedScalars = WidenValues<["foo", 42, false, null]>;
        type NoChange = WidenValues<[string, number]>;
        type EmbeddedObj = WidenValues<[{ foo: 1 }, { bar: 2 }]>;

        type cases = [
            Expect<Test<Str, "equals",  [string, string]>>,
            Expect<Test<MixedScalars, "equals",  [string, number, boolean, null]>>,
            Expect<Test<NoChange, "equals",  [string, number]>>,
            Expect<HasSameValues<EmbeddedObj, [
                { foo: number }, { bar: number }
            ]>>
        ];
    });

});

import { Equal, Expect } from "@type-challenges/utils";
import { AsNonNull, ErrorCondition, Extends, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("AsNonNull<T>", () => {

    it("Happy Path", () => {
        type WasNever = AsNonNull<"foobar">;
        type Union = AsNonNull<"foobar" | null>;
        type PropKey = AsNonNull<PropertyKey | null>;
        type JustNull = AsNonNull<null>;

        type cases = [
            Expect<Test<WasNever, "equals",  "foobar">>,
            Expect<Test<Union, "equals",  "foobar">>,
            Expect<Test<PropKey, "equals",  PropertyKey>>,
            Expect<Extends<JustNull, ErrorCondition<"invalid-cast">>>,
        ];

    });

});

import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { UsStateAbbrev } from "inferred-types/types";



describe("StringLiteral<T>", () => {

    it("happy path", () => {
        type X = AsStringLiteral<"there I was {{string}}, waiting for {{ number }} knobs from {{ UsState }}">;

        // @ts-ignore
        type cases = [
            Expect<Equal<
                X,
                `there I was ${string}, waiting for ${number} knobs from ${UsStateAbbrev}`
            >>
        ];
    });

});


import { describe, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import type { StripLeadingTemplate } from "inferred-types/types";

describe("StripLeadingTemplate<T, K>", () => {

    it("should strip leading template segment", () => {

        type Str = StripLeadingTemplate<`${string}foo`>;
        type Num = StripLeadingTemplate<`${number}bar`>;
        type Bool = StripLeadingTemplate<`${boolean}baz`>;
        type Only = StripLeadingTemplate<`${string}`>;
        type Empty = StripLeadingTemplate<"">;

        type cases = [
            Expect<Equal<Str, "foo">>,
            Expect<Equal<Num, "bar">>,
            Expect<Equal<Bool, "baz">>,
            Expect<Equal<Only, string>>,
            Expect<Equal<Empty, "">>,
        ];
    });

    it("strings with no template literals are proxied through", () => {
        type None = StripLeadingTemplate<"foobar">;

        type cases = [
            Expect<Equal<None, "foobar">>,
        ];
    });

    it("isolated template scope only removes that which was specified", () => {
        type Proxy1 = StripLeadingTemplate<`${string}, well hello`, "number">;

        type cases = [
            Expect<Equal<Proxy1, `${string}, well hello`>>,
        ];
    });

    it("te", () => {
        type Num = StripLeadingTemplate<`${number}foo`, "number">;
        type Str = StripLeadingTemplate<`${string}foo`, "string">;
        type Bool = StripLeadingTemplate<`${boolean}foo`, "boolean">;

        type cases = [
            Expect<Equal<Num, "foo">>,
            Expect<Equal<Str, "foo">>,
            Expect<Equal<Bool, "foo">>,
        ];
    });

});

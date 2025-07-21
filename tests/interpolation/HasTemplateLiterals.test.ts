import { describe, it } from "vitest";
import {
    Expect,
    IsTemplateLiteral,
} from "inferred-types/types";
import { Equal } from "@type-challenges/utils";

describe("HasTemplateLiterals<T>", () => {
    type Start = IsTemplateLiteral<`${number} is a number`>;
    type End = IsTemplateLiteral<`you age is ${number}`>;
    type Mid1 = IsTemplateLiteral<`what up ${string}?`>;
    type Mid = IsTemplateLiteral<`you age is ${number}, and your name is ${string}.`>;
    type None = IsTemplateLiteral<"just a string">;
    type Only = IsTemplateLiteral<`${string}`>;
    type Multi = IsTemplateLiteral<`${number}-${string}-${boolean}`>;
    type Punctuation = IsTemplateLiteral<`foo-${string}.bar`>;
    type Empty = IsTemplateLiteral<"">;
    type Wide = IsTemplateLiteral<string>;
    type PrefixSuffix = IsTemplateLiteral<`foo${number}bar`>;
    type EndingStrTemplate = IsTemplateLiteral<`Hi${string}`>;
    type Bool = IsTemplateLiteral<`Hi${boolean}!`>;

    it("should detect template literals in various positions", () => {
        type cases = [
            Expect<Equal<Start, true>>,
            Expect<Equal<End, true>>,
            Expect<Equal<Mid1, true>>,
            Expect<Equal<Mid, true>>,
            Expect<Equal<None, false>>,
            Expect<Equal<Only, false>>,
            Expect<Equal<Multi, true>>,
            Expect<Equal<Punctuation, true>>,
            Expect<Equal<Empty, false>>,
            Expect<Equal<Wide, false>>,
            Expect<Equal<PrefixSuffix, true>>,
            Expect<Equal<EndingStrTemplate, true>>,
            Expect<Equal<Bool, true>>,
        ];
    });
});


import { describe, it } from "vitest";
import {
    Expect,
    HasTemplateLiterals,
} from "inferred-types/types";
import { Equal } from "@type-challenges/utils";

describe("HasTemplateLiterals<T>", () => {
    type Start = HasTemplateLiterals<`${number} is a number`>;
    type End = HasTemplateLiterals<`you age is ${number}`>;
    type Mid1 = HasTemplateLiterals<`what up ${string}?`>;
    type Mid = HasTemplateLiterals<`you age is ${number}, and your name is ${string}.`>;
    type None = HasTemplateLiterals<"just a string">;
    type Only = HasTemplateLiterals<`${string}`>;
    type Multi = HasTemplateLiterals<`${number}-${string}-${boolean}`>;
    type Punct = HasTemplateLiterals<`foo-${string}.bar`>;
    type Empty = HasTemplateLiterals<"">;
    type Wide = HasTemplateLiterals<string>;
    type PrefixSuffix = HasTemplateLiterals<`foo${number}bar`>;

    it("should detect template literals in various positions", () => {
        type cases = [
            Expect<Equal<Start,true>>,
            Expect<Equal<End, true>>,
            Expect<Equal<Mid1, true>>,
            Expect<Equal<Mid, true>>,
            Expect<Equal<None, false>>,
            Expect<Equal<Only, true>>,
            Expect<Equal<Multi, true>>,
            Expect<Equal<Punct, true>>,
            Expect<Equal<Empty, false>>,
            Expect<Equal<Wide, false>>,
            Expect<Equal<PrefixSuffix, true>>,
        ];
    });
});

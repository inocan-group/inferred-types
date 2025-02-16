import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import {
    DoesExtend,
    IndexableObject,
    Dictionary
} from "inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.
type FooBar = { foo: 42; bar: number };
type FooBarExt = { foo: 42; bar: number;[key: string]: unknown };

describe("IndexableObject and IndexedObject", () => {
    type Generic = { [key: string]: unknown };


    it("IndexableObject Basics", () => {
        type FooBarIdx = IndexableObject<FooBar>;
        type FooBarIdxStr = IndexableObject<FooBar, Dictionary<string>>;

        type Identity = IndexableObject<Dictionary>;

        type cases = [
            Expect<Equal<
                FooBarIdx,
                {
                    foo: 42;
                    bar: number;
                    [x: string]: unknown;
                    [x: symbol]: unknown;
                }
            >>,
            Expect<Equal<
                FooBarIdxStr,
                {
                    foo: 42;
                    bar: number;
                    [x: string]: unknown;
                }
            >>,
            Expect<Equal<Identity, Dictionary>>,
        ];
        const cases: cases = [
            true, true, true
        ];
    });

    it("positive tests", () => {
        type cases = [
            // a generic string key definition extends a indexable object
            Expect<DoesExtend<Generic, IndexableObject>>,
            // FooBar is an example of a indexable Object
            Expect<DoesExtend<FooBar, IndexableObject>>,
            Expect<DoesExtend<FooBarExt, IndexableObject>>,
            // IndexableObject are a refinement of the generic Object interface
            Expect<DoesExtend<IndexableObject, object>>,

        ];

        const cases: cases = [true, true, true, true,];
    });



});

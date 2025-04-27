import { describe, it } from "vitest";
import {
    Expect,
    DoesExtend,
    IndexableObject,
    Dictionary,
    Test
} from "inferred-types/types";


type FooBar = { foo: 42; bar: number };
type FooBarExt = { foo: 42; bar: number;[key: string]: unknown };

describe("IndexableObject and IndexedObject", () => {
    type Generic = { [key: string]: unknown };


    it("IndexableObject Basics", () => {
        type FooBarIdx = IndexableObject<FooBar>;
        type FooBarIdxStr = IndexableObject<FooBar, Dictionary<string>>;

        type Identity = IndexableObject<Dictionary>;

        type cases = [
            Expect<Test<
                FooBarIdx,
                "equals",
                {
                    foo: 42;
                    bar: number;
                    [x: string]: unknown;
                    [x: symbol]: unknown;
                }
            >>,
            Expect<Test<
                FooBarIdxStr,
                "equals",
                {
                    foo: 42;
                    bar: number;
                    [x: string]: unknown;
                }
            >>,
            Expect<Test<Identity, "equals",  Dictionary>>,
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
    });



});

import { Equal, Expect } from "@type-challenges/utils";
import { AsRecord, ObjectKey } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsRecord<T>", () => {

    it("happy path", () => {
        type Tup = AsRecord<[1, 2, 3]>;
        type Obj = AsRecord<object>;
        type Rec = AsRecord<Record<ObjectKey, number>>;
        type FooBar = AsRecord<{ foo: 1; bar: 2 }>;

        type cases = [
            Expect<Equal<Tup, [1, 2, 3]>>,
            Expect<Equal<Obj, NonNullable<unknown>>>,
            Expect<Equal<Rec, Record<ObjectKey, number>>>,
            Expect<Equal<FooBar, { foo: 1; bar: 2 }>>
        ];
        const cases: cases = [
            true, true, true, true
        ];
    });

});

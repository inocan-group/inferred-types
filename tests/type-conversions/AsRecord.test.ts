import { Equal, Expect } from "@type-challenges/utils";
import { AsRecord, ObjectKey } from "inferred-types/types";
import { describe, it } from "vitest";



describe("AsRecord<T>", () => {

    it("happy path", () => {
        type Tup = AsRecord<[1, 2, 3]>;
        type Obj = AsRecord<object>;
        type Rec = AsRecord<Record<ObjectKey, number>>;
        type FooBar = AsRecord<{ foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<Tup, [1, 2, "equals",  3]>>,
            Expect<Test<Obj, "equals",  NonNullable<unknown>>>,
            Expect<Test<Rec, Record<ObjectKey, "equals",  number>>>,
            Expect<Test<FooBar, "equals",  { foo: 1; bar: 2 }>>
        ];
        const cases: cases = [
            true, true, true, true
        ];
    });

});

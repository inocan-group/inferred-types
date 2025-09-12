
import { describe, it } from "vitest";
import type { AsRecord, Expect, ObjectKey, Test } from "inferred-types/types";

describe("AsRecord<T>", () => {

    it("happy path", () => {
        type Tup = AsRecord<[1, 2, 3]>;
        type Obj = AsRecord<object>;
        type Rec = AsRecord<Record<ObjectKey, number>>;
        type FooBar = AsRecord<{ foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<Tup, "equals", [1, 2,  3]>>,
            Expect<Test<Obj, "equals",  NonNullable<unknown>>>,
            Expect<Test<Rec, "equals",  Record<ObjectKey, number>>>,
            Expect<Test<FooBar, "equals",  { foo: 1; bar: 2 }>>
        ];
    });

});

import { describe, expect, it } from "vitest";
import type { Expect, MergeObjects, Test } from "inferred-types/types";

import { mergeObjects } from "inferred-types/runtime";

describe("MergeObjects<A,B>", () => {

    it("happy path", () => {
        type T1 = MergeObjects<{ foo: 1; bar: 2 }, { bar: 4; baz: "howdy" }>;
        type T2 = MergeObjects<{ bar: 4; baz: "howdy" }, { foo: 1; bar: 2 }>;

        type cases = [
            Expect<Test<T1, "equals",  { foo: 1; bar: 4; baz: "howdy" }>>,
            Expect<Test<T2, "equals",  { foo: 1; bar: 2; baz: "howdy" }>>,
        ];

    });

    it("empty override", () => {
      type T = MergeObjects<{ foo: 1; bar: 2}, {}>;

      type cases = [
        Expect<Test<T, "equals",  { foo: 1; bar: 2}>>
      ];
    });

    it("can override base type", () => {
        type T1 = MergeObjects<{ foo: 1; bar: 2 }, { foo: "foo"; bar: "bar" }>;

        type cases = [
            Expect<Test<T1, "equals",  { foo: "foo"; bar: "bar" }>>,
        ];
    });

    it("merging with optional params overriding", () => {
        type T1 = MergeObjects<
            { foo: 1; bar: 2 },
            { bar: 4; baz: "howdy"}
        >;

        type T2 = MergeObjects<
            { foo: 1; bar: 2 },
            { bar: 4; baz?: "howdy"}
        >;

        type cases = [
            Expect<Test<
                T1, "equals",
                { foo: 1; bar: 4; baz: "howdy" }
            >>,
            Expect<Test<
                T2, "equals",
                { foo: 1; bar: 4; baz?: "howdy" }
            >>
        ];
    });

});

describe("mergeObjects(a,b)", () => {

    it("happy path", () => {
        const t1 = mergeObjects({ foo: 1, bar: 2 }, { bar: 4, baz: "howdy" });
        const t2 = mergeObjects({ bar: 4, baz: "howdy" }, { foo: 1, bar: 2 });
        const t3 = mergeObjects({}, { foo: 1 });
        const t4 = mergeObjects({ foo: 1 }, {});

        expect(t1).toEqual({ foo: 1, bar: 4, baz: "howdy" });
        expect(t2).toEqual({ foo: 1, bar: 2, baz: "howdy" });
        expect(t3).toEqual({ foo: 1 });
        expect(t4).toEqual({ foo: 1 });

        type cases = [
            Expect<Test<typeof t1, "equals",  { foo: 1; bar: 4; baz: "howdy" }>>,
            Expect<Test<typeof t2, "equals",  { foo: 1; bar: 2; baz: "howdy" }>>,
            Expect<Test<typeof t3, "equals",  { foo: 1; }>>,
            Expect<Test<typeof t4, "equals",  { foo: 1; }>>,
        ];

    });

});

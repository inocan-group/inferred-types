import { describe, expect, it } from "vitest";
import type { CombinedKeys, Expect, Merge, MergeObjects, MergeScalars, MergeTuples, Test } from "inferred-types/types";

import { mergeScalars, mergeTuples } from "inferred-types/runtime";

describe("MergeObjects<A,B>", () => {
    it("happy path", () => {
        type O1 = { foo: 1; bar: 2 };
        type O2 = { bar: 3; baz: 4 };

        type M1 = MergeObjects<O2, O1>;
        type M2 = MergeObjects<O1, O2>;

        type cases = [
            Expect<Test<M1, "equals", { foo: 1; bar: 2; baz: 4 }>>,
            Expect<Test<M2, "equals", { foo: 1; bar: 3; baz: 4 }>>,
        ];
    });

    it("deep object", () => {
        type O1 = { foo: 1; bar: 2; deep: { a: 1 } };
        type O2 = { bar: 3; baz: 4; deep: { a: 2; b: 3 } };

        type M1 = MergeObjects<O2, O1>;

        type cases = [
            Expect<Test<M1, "equals", { foo: 1; bar: 2; baz: 4; deep: { a: 1 } }>>,
        ];

    });

});

describe("MergeTuples<TDefault,TOverride>", () => {

    it("happy path", () => {
        type Nothing = MergeTuples<[], []>;
        type Unchanged = MergeTuples<["foo", "bar"], []>;
        type Barbar = MergeTuples<["foo", "bar"], ["bar"]>;
        type Eclipsed = MergeTuples<["foo", "bar"], ["baz", "bar", "foo"]>;

        type cases = [
            Expect<Test<Nothing, "equals", readonly []>>,
            Expect<Test<Unchanged, "equals", readonly ["foo", "bar"]>>,
            Expect<Test<Barbar, "equals", readonly ["bar", "bar"]>>,
            Expect<Test<Eclipsed, "equals", readonly ["baz", "bar", "foo"]>>,
        ];

    });

});

describe("MergeScalars", () => {

    it("happy path", () => {

        type cases = [
            Expect<Test<MergeScalars<4, 5>, "equals", 5>>, // override prevails
            Expect<Test<MergeScalars<4, undefined>, "equals", 4>>, // no override, default prevails
            Expect<Test<MergeScalars<number, 5>, "equals", 5>>, // wide type for default is ignored
            Expect<Test<MergeScalars<4, number>, "equals", number>>, // type widened to fit override
            Expect<Test<MergeScalars<number, 5>, "equals", 5>>, // override being wide has no bearing
            Expect<Test<MergeScalars<number, number>, "equals", number>>
        ];
    });
});

describe("mergeScalars(a,b)", () => {
    it("runtime", () => {
        expect(mergeScalars(4, 5)).toBe(5);
        expect(mergeScalars(4, undefined)).toBe(4);
    });
});

describe("Merge Tuples", () => {
    const partial = [undefined, "bar"] as const;
    const foobar = ["foo", "bar"] as const;
    const baz42 = ["baz", 42] as const;
    const lengthy = ["one", "two", "three", "four", "five"] as const;

    it("type testing", () => {
        type Partial = typeof partial;
        type Foobar = typeof foobar;
        type Baz42 = typeof baz42;
        type Lengthy = typeof lengthy;

        type OverrideFully = MergeTuples<Foobar, Baz42>;
        type PartialOverride = MergeTuples<Baz42, Partial>;
        type OverExtend = MergeTuples<Lengthy, Foobar>;

        type cases = [
            Expect<Test<OverrideFully, "equals", Baz42>>,
            Expect<Test<PartialOverride, "equals", readonly ["baz", "bar"]>>,
            Expect<Test<OverExtend, "equals", readonly ["foo", "bar", "three", "four", "five"]>>
        ];
    });

    it("runtime tests", () => {
        // override fully
        expect(mergeTuples(foobar, baz42)).toEqual(baz42);
        // partial override
        expect(mergeTuples(baz42, partial)).toEqual(["baz", "bar"]);
        // extend
        expect(mergeTuples(lengthy, foobar)).toEqual(["foo", "bar", "three", "four", "five"]);
        // empty arrays
        expect(mergeTuples(foobar, [])).toEqual(foobar);
        expect(mergeTuples([], foobar)).toEqual(foobar);
    });
});

describe("Merge Objects", () => {

    it("CombinedKeys<A,B>", () => {
        type FooBarBaz = CombinedKeys<{ foo: 1; bar: 2 }, { baz: 3 }>;

        type cases = [
            Expect<Test<FooBarBaz, "hasSameKeys", ["foo", "bar", "baz"]>>
        ];

    });

    it("type tests", () => {
        type JustExtend = MergeObjects<{ foo: 1; bar: 2 }, { baz: 3 }>;
        type JustExtend2 = MergeObjects<{ baz: 3 }, { foo: 1; bar: 2 }>;
        type FullyOverride = MergeObjects<{ foo: 1; bar: 2 }, { foo: 2; bar: 3 }>;

        type cases = [
            Expect<Test<JustExtend, "equals", { foo: 1; bar: 2; baz: 3 }>>,
            Expect<Test<JustExtend2, "equals", { foo: 1; bar: 2; baz: 3 }>>,
            Expect<Test<FullyOverride, "equals", { foo: 2; bar: 3 }>>
        ];

    });
});

describe("Merge<A,B>", () => {

    it("happy path", () => {
        type FooBar = Merge<{ foo: 1 }, { bar: 2 }>;
        type Replaced = Merge<{ foo: 0; bar: 0 }, { foo: 1; bar: 2 }>;
        type Both = Merge<{ foo: 1; bar: 2 }, { baz: 3 }>;

        type ObjFromNada = Merge<undefined, { foo: 1 }>;
        type ObjFromNull = Merge<null, { foo: 1 }>;

        type Invalid = Merge<5, "foo">;
        type Nothing = Merge<null, undefined>;

        type cases = [
            Expect<Test<FooBar, "equals", { foo: 1; bar: 2 }>>,
            Expect<Test<Replaced, "equals", { foo: 1; bar: 2 }>>,
            Expect<Test<Both, "equals", { foo: 1; bar: 2; baz: 3 }>>,

            Expect<Test<ObjFromNada, "equals", { foo: 1 }>>,
            Expect<Test<ObjFromNull, "equals", { foo: 1 }>>,

            Expect<Test<Invalid, "isError", Error>>,
            Expect<Test<Nothing, "equals", undefined>>,
        ];

    });

});


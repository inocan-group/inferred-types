import { Equal, Expect } from "@type-challenges/utils";
import { filter, FilterFn } from "inferred-types/runtime";
import { Compare, Filter, Test } from "inferred-types/types";
import { describe, expect, it } from "vitest";

describe("filter()", () => {

    it("partial application of startsWith (parameters suggest fn parameters)", () => {
        // const startWith = filter("startsWith", "foo");
        // const startWithMulti = filter("startsWith", "foo", "bar");

        // type Single = typeof startWith;
        // type SingleParam = Parameters<Single>[0];
        // type SingleReturns = ReturnType<Single>;

        // type Multi = typeof startWithMulti;
        // type MultiParam = Parameters<Multi>[0];

        // type cases = [
        //     Expect<Test<typeof startWith, FilterFn<"startsWith", "equals",  ["foo"]>>>,
        //     Expect<Test<typeof startWithMulti, FilterFn<"startsWith", ["foo", "equals",  "bar"]>>>,

        //     Expect<Test<SingleParam, "equals",  string | readonly string[]>>,
        //     Expect<Test<MultiParam, "equals",  string | readonly string[]>>,
        // ];
    });


    it("partial application of truthy (no params, no accept clause)", () => {
        const truthy = filter("truthy");

        type Truthy = typeof truthy;
        type TruthyParam = Parameters<Truthy>[0];

        type cases = [
            /** type tests */
        ];
    });


    it("partial application of keyEndsWith (has accept clause)", () => {
        // const keyEndsWith = filter("keyEndsWith", "_");

        // type cases = [
        //     /** type tests */
        // ];
    });



    it("startsWith filter used as singular function", () => {
        const t1 = filter("startsWith", "foo")("foobar");
        const f1 = filter("startsWith", "foo")("barbar");
        const b1 = filter("startsWith", "foo")("barbar" as string);

        const t2 = filter("startsWith", "42")(420);
        const t3 = filter("startsWith", 42)(420);
        const t4 = filter("startsWith", 42)("420");

        const ut1 = filter('startsWith', "foo", "bar")("foobar");
        const ut2 = filter('startsWith', "foo", "bar")("barbar");

        const uf1 = filter('startsWith', "foo", "bar")("baz");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);

        expect(ut1).toBe(true);
        expect(ut2).toBe(true);

        expect(f1).toBe(false);
        expect(uf1).toBe(false);

        type cases = [
            Expect<Test<typeof t1, "equals",  true>>,
            Expect<Test<typeof f1, "equals",  false>>,
            Expect<Test<typeof b1, "equals",  boolean>>,

            Expect<Test<typeof t2, "equals",  true>>,
            Expect<Test<typeof t3, "equals",  true>>,
            Expect<Test<typeof t4, "equals",  true>>,

            Expect<Test<typeof ut1, "equals",  true>>,
            Expect<Test<typeof ut2, "equals",  true>>,
            Expect<Test<typeof uf1, "equals",  false>>,
        ];
    });


    it("startWith used on a tuple", () => {
        const doIt = filter("startsWith", "foo", "bar");
        const t = doIt(["fooBar", "barBar", "baz", "boot"]);
        type T = typeof t;

        expect(t).toEqual(["fooBar", "barBar"]);

        type cases = [
            Expect<Test<T, ["fooBar", "equals",  "barBar"]>>
        ];
    });

    it("endsWith filter used as singular function", () => {
        const t1 = filter("endsWith", "bar")("foobar");
        const f1 = filter("endsWith", "baz")("barbar");
        const b1 = filter("endsWith", "bar")("barbar" as string);

        const t2 = filter("endsWith", "20")(420);
        const t3 = filter("endsWith", 20)(420);
        const t4 = filter("endsWith", 20)("420");

        const endsWith = filter('endsWith', "foo", "bar");
        const ut1 = endsWith("foobar");
        const ut2 = endsWith("barfoo");

        const uf1 = endsWith("baz");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);
        expect(t4).toBe(true);

        expect(ut1).toBe(true);
        expect(ut2).toBe(true);

        expect(f1).toBe(false);
        expect(uf1).toBe(false);


        type cases = [
            Expect<Test<typeof t1, "equals",  true>>,
            Expect<Test<typeof f1, "equals",  false>>,
            Expect<Test<typeof b1, "equals",  boolean>>,

            Expect<Test<typeof t2, "equals",  true>>,
            Expect<Test<typeof t3, "equals",  true>>,
            Expect<Test<typeof t4, "equals",  true>>,

            Expect<Test<typeof ut1, "equals",  true>>,
            Expect<Test<typeof ut2, "equals",  true>>,
            Expect<Test<typeof uf1, "equals",  false>>,
        ];
    });


    it("endsWith used on a tuple", () => {
        const doIt = filter("endsWith", "foo", "Bar");
        const t = doIt(["fooBar", "barBar", "baz", "boot"]);
        type T = typeof t;

        expect(t).toEqual(["fooBar", "barBar"]);

        type cases = [
            Expect<Test<T, ["fooBar", "equals",  "barBar"]>>
        ];
    });



    it("contains filter used as singular function", () => {
        const fn = filter("contains", "foo");
        const t1 = fn("foo");
        const t2 = fn("foobar");
        const t3 = fn("barfoo");

        const f1 = fn("baz");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);

        expect(f1).toBe(false);


        type cases = [
            Expect<Test<typeof t1, "equals",  true>>,
            Expect<Test<typeof t2, "equals",  true>>,
            Expect<Test<typeof t3, "equals",  true>>,
            Expect<Test<typeof f1, "equals",  false>>,
        ];
    });


    it("contains used on a tuple", () => {
        const fn = filter("contains", "foo");
        const t1 = fn(["foo","foobar","baz"]);

        expect(t1).toEqual(["foo","foobar"])

        type cases = [
            Expect<Test<typeof t1, [ "foo", "equals", "foobar" ]>>,
        ];
    });

    it("containsSome filter used as singular function", () => {
        const fn = filter("containsSome", "foo", "bar");
        const t1 = fn("foo");
        const t2 = fn("foobar");
        const t3 = fn("bar");

        const f1 = fn("baz");

        expect(t1).toBe(true);
        expect(t2).toBe(true);
        expect(t3).toBe(true);

        expect(f1).toBe(false);


        type cases = [
            Expect<Test<typeof t1, "equals",  true>>,
            Expect<Test<typeof t2, "equals",  true>>,
            Expect<Test<typeof t3, "equals",  true>>,
            Expect<Test<typeof f1, "equals",  false>>,
        ];
    });

    it("containsAll filter used as singular function", () => {
        const fn = filter("containsAll", "foo", "bar");
        const t1 = fn("foobar");

        const f1 = fn("foo");
        const f2 = fn("baz");

        expect(t1).toBe(true);

        expect(f1).toBe(false);
        expect(f2).toBe(false);

        type cases = [
            Expect<Test<typeof t1, "equals",  true>>,
            Expect<Test<typeof f1, "equals",  false>>,
            Expect<Test<typeof f2, "equals",  false>>,
        ];
    });




});

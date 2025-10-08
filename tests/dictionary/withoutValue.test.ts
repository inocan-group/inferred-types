import { describe, expect, it } from "vitest";
import type { Expect } from "@type-challenges/utils";
import { createFnWithProps, narrow } from "inferred-types/runtime";
import type { Dictionary, EmptyObject, Test, WithoutValue, AssertEqual, AssertFalse} from "inferred-types/types";

import {
    withoutValue,
    defineObj
} from "inferred-types/runtime";

const obj = defineObj({
    id: "foobar",
    foo2: 2,
    foo3: 3,
    success: true,
    fail: false
})({
    foo: 1,
    bar: true,
    message: "hi there",
    numericArr: [1, 2, 3],
    strArr: ["foo", "bar"],
    fn: () => "hi",
    fnWithProp: createFnWithProps(() => "hi", { foo: "there" }),
    baz: { foo: 1, bar: 2 },
    emptyBaz: {}
});

describe("WithoutValue<TObj,TVal> type util", () => {

    it("using the default 'extends' comparison", () => {
        type Str = WithoutValue<typeof obj, string>;
        type Num = WithoutValue<typeof obj, number>;
        type Bool = WithoutValue<typeof obj, boolean>;

        type cases = [
            Expect<AssertEqual<
                Str,
                {
                    foo2: 2;
                    foo3: 3;
                    success: true;
                    fail: false;
                    foo: number;
                    bar: boolean;
                    numericArr: number[];
                    strArr: string[];
                    fn: () => string;
                    fnWithProp: (() => string) & {
                        foo: string;
                    };
                    baz: {
                        foo: number;
                        bar: number;
                    };
                    emptyBaz: {};
                }
            >>,
            Expect<AssertEqual<
                Num,
                {
                    id: "foobar";
                    success: true;
                    fail: false;
                    bar: boolean;
                    message: string;
                    numericArr: number[];
                    strArr: string[];
                    fn: () => string;
                    fnWithProp: (() => string) & {
                        foo: string;
                    };
                    baz: {
                        foo: number;
                        bar: number;
                    };
                    emptyBaz: {};
                }
            >>,
            Expect<AssertEqual<
                Bool,
                {
                    id: "foobar";
                    foo2: 2;
                    foo3: 3;
                    foo: number;
                    message: string;
                    numericArr: number[];
                    strArr: string[];
                    fn: () => string;
                    fnWithProp: (() => string) & {
                        foo: string;
                    };
                    baz: {
                        foo: number;
                        bar: number;
                    };
                    emptyBaz: {};
                }
            >>,

        ];
    });


});

describe("withoutValue(wo) => (obj) => obj", () => {
    const obj = defineObj({
        foo: "hi",
        bar: 42, baz: 99,
        bax: "bye",
        logical: true, illogical: false
    })();

    it("strings", () => {

        const wide = withoutValue("string")(obj);
        const narrow = withoutValue("hi")(obj);

        expect(wide).toEqual({
            bar: 42,
            baz: 99,
            logical: true,
            illogical: false,
        });
        expect(narrow).toEqual({
            bar: 42,
            baz: 99,
            bax: "bye",
            logical: true,
            illogical: false,
        });

        type cases = [
            Expect<AssertEqual<
                typeof wide,
                {
                    bar: 42;
                    baz: 99;
                    logical: true;
                    illogical: false;
                }
            >>,
            Expect<AssertEqual<
                typeof narrow,
                {
                    bar: 42;
                    baz: 99;
                    bax: "bye";
                    logical: true;
                    illogical: false;
                }
            >>,
        ];
    });



    it("optional strings", () => {
        const obj = defineObj({
            foo: "hi",
            bar: 42,
            baz: 99,
            bax: "bye",
            nada: undefined
        })();

        const optStr = withoutValue("string|undefined")(obj);

        expect(optStr).toEqual({
            bar: 42,
            baz: 99,
        })

        type cases = [
            Expect<AssertEqual<
                typeof optStr,
                {
                    bar: 42;
                    baz: 99;
                }
            >>
        ];
    });


    it("numbers", () => {
        const wide = withoutValue("number")({ foo: "text", bar: 42, baz: 99, qux: true });
        const narrow = withoutValue(42)({ foo: "text", bar: 42, baz: 99, qux: 42 });

        expect(wide).toEqual({ foo: "text", qux: true });
        expect(narrow).toEqual({ foo: "text", baz: 99 });

        type cases = [
            Expect<AssertEqual<typeof wide, { foo: "text", qux: true }>>,
            Expect<AssertEqual<typeof narrow, { foo: "text", baz: 99 }>>,
        ];
    });

    it("booleans", () => {
        const wide = withoutValue("boolean")(obj);
        const narrowTrue = withoutValue(true)(obj);
        const narrowFalse = withoutValue(false)(obj);

        expect(wide).toEqual({
            foo: "hi",
            bar: 42,
            baz: 99,
            bax: "bye",
        });
        expect(narrowTrue).toEqual({
            foo: "hi",
            bar: 42,
            baz: 99,
            bax: "bye",
            illogical: false,
        });
        expect(narrowFalse).toEqual({
            foo: "hi",
            bar: 42,
            baz: 99,
            bax: "bye",
            logical: true,
        });

        type cases = [
            Expect<AssertEqual<typeof wide, {
                foo: "hi",
                bar: 42,
                baz: 99,
                bax: "bye",
            }>>,
            Expect<AssertEqual<typeof narrowTrue, {
                foo: "hi",
                bar: 42,
                baz: 99,
                bax: "bye",
                illogical: false,
            }>>,
            Expect<AssertEqual<typeof narrowFalse, {
                foo: "hi",
                bar: 42,
                baz: 99,
                bax: "bye",
                logical: true,
            }>>,
        ];
    });

    it("arrays", () => {
        const obj = narrow({
            foo: ["foo"],
            bar: "nope",
            baz: [1,2,3],
            sometimes: ["foo",undefined,"bar"],
            mixed: ["foo", 1]

        })

        const stringArray = withoutValue("string[]")(obj);
        const numberArray = withoutValue("number[]")(obj);

        expect(stringArray).toEqual({
            bar: "nope",
            baz: [1, 2, 3],
            sometimes: ["foo", undefined, "bar"],
            mixed: ["foo", 1],
        });
        expect(numberArray).toEqual({
            foo: ["foo"],
            bar: "nope",
            sometimes: ["foo", undefined, "bar"],
            mixed: ["foo", 1],
        });

        type cases = [
            Expect<AssertEqual<typeof stringArray, {
                bar: "nope",
                baz: [1, 2, 3],
                sometimes: ["foo", undefined, "bar"],
                mixed: ["foo", 1],
            }>>,
            Expect<AssertEqual<typeof numberArray, {
                foo: ["foo"],
                bar: "nope",
                sometimes: ["foo", undefined, "bar"],
                mixed: ["foo", 1],
            }>>,
        ];
    });

    it("dictionaries", () => {
        const obj = narrow({
            foo: 123,
            bar: { a: "hello", b: "world" },
            baz: "hi",
            qux: { m: 42, n: 99 }
        })

        const dictWithStringValues = withoutValue("Record<ObjectKey,string>")(obj);
        const dictWithAny = withoutValue("Record<ObjectKey,unknown>")(obj);

        expect(dictWithStringValues).toEqual({
                foo: 123,
                baz: "hi",
                qux: {
                    m: 42,
                    n: 99,
                }
            });
        expect(dictWithAny).toEqual({ foo: 123, baz: "hi" });

        type cases = [
            Expect<AssertEqual<
                typeof dictWithStringValues,
                {
                    foo: 123,
                    baz: "hi",
                    qux: {
                        m: 42;
                        n: 99;
                    };
                }
            >>,
            Expect<AssertEqual<
                typeof dictWithAny,
                {
                    foo: 123,
                    baz: "hi",
                }
            >>,
        ];
    });

});

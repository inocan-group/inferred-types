import { describe, expect, it } from "vitest";
import type { Expect } from "@type-challenges/utils";
import { createFnWithProps, narrow } from "inferred-types/runtime";
import type { Dictionary, EmptyObject, Test, WithValue, AssertEqual} from "inferred-types/types";

import {
    withValue,
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

describe("WithValue<TObj,TVal> type util", () => {

    it("using the default 'extends' comparison", () => {
        type Str = WithValue<typeof obj, string>;
        type Num = WithValue<typeof obj, number>;
        type Bool = WithValue<typeof obj, boolean>;
        type Wide = WithValue<Dictionary, string>;

        type cases = [
            Expect<Test<Str, "equals", { id: "foobar"; message: string }>>,
            Expect<Test<Num, "equals", { foo: number; foo2: 2; foo3: 3 }>>,
            Expect<Test<Bool, "equals", { success: true; fail: false; bar: boolean }>>,
            Expect<Test<Wide, "equals", EmptyObject>>
        ];
        const cases: cases = [true, true, true, true];
    });

    it("using the 'equals' comparison", () => {
        type Str = WithValue<typeof obj, string>;
        type Num = WithValue<typeof obj, number>;
        type Bool = WithValue<typeof obj, boolean, "equals">;

        type cases = [
            //
            Expect<Test<Str, "equals", { id: "foobar"; message: string }>>,
            Expect<Test<Num, "equals", { foo: number; foo2: 2; foo3: 3 }>>,
            Expect<Test<Bool, "equals", { bar: boolean }>>,
        ];
        const cases: cases = [true, true, true];
    });
});

describe("withValue(wo) => (obj) => obj", () => {
    const obj = defineObj({
        foo: "hi",
        bar: 42, baz: 99,
        bax: "bye",
        logical: true, illogical: false
    })();

    it("strings", () => {

        const wide = withValue("string")(obj);
        const narrow = withValue("hi")(obj);

        expect(wide).toEqual({ foo: "hi", bax: "bye" });
        expect(narrow).toEqual({ foo: "hi" });

        type cases = [
            Expect<AssertEqual<typeof wide, { foo: "hi", bax: "bye"}>>,
            Expect<AssertEqual<typeof narrow, { foo: "hi"}>>,
        ];
    });



    it("optional strings", () => {
        const obj = defineObj({
            foo: "hi",
            bar: 42, baz: 99,
            bax: "bye",
            nada: undefined
        })();

        const optStr = withValue("string|undefined")(obj);

        type cases = [
            Expect<AssertEqual<
                typeof optStr,
                {
                    foo: "hi",
                    bax: "bye",
                    nada: undefined
                }
            >>
        ];
    });


    it("numbers", () => {
        const wide = withValue("number")({ foo: "text", bar: 42, baz: 99, qux: true });
        const narrow = withValue(42)({ foo: "text", bar: 42, baz: 99, qux: 42 });

        expect(wide).toEqual({ bar: 42, baz: 99 });
        expect(narrow).toEqual({ bar: 42, qux: 42 });

        type cases = [
            Expect<AssertEqual<typeof wide, { bar: 42, baz: 99 }>>,
            Expect<AssertEqual<typeof narrow, { bar: 42, qux: 42 }>>,
        ];
    });

    it("booleans", () => {
        const wide = withValue("boolean")(obj);
        type NoteThatTypeUtilityWorks = WithValue<typeof obj, boolean>;
        const narrowTrue = withValue(true)(obj);
        const narrowFalse = withValue(false)(obj);

        expect(wide).toEqual({ logical: true, illogical: false });
        expect(narrowTrue).toEqual({ logical: true });
        expect(narrowFalse).toEqual({ illogical: false });

        type cases = [
            Expect<AssertEqual<typeof wide, { logical: true, illogical: false }>>,
            Expect<AssertEqual<typeof narrowTrue, {logical: true }>>,
            Expect<AssertEqual<typeof narrowFalse, { illogical: false }>>,
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

        const stringArray = withValue("string[]")(obj);
        const numberArray = withValue("number[]")(obj);

        expect(stringArray).toEqual({ foo: ["foo"] });
        expect(numberArray).toEqual({ baz: [1, 2, 3] });

        type cases = [
            Expect<AssertEqual<typeof stringArray, { foo: ["foo"] }>>,
            Expect<AssertEqual<typeof numberArray, { baz: [1, 2, 3] }>>,
        ];
    });

    it("dictionaries", () => {
        const obj = narrow({
            foo: 123,
            bar: { a: "hello", b: "world" },
            baz: "hi",
            qux: { m: 42, n: 99 }
        })

        const dictWithStringValues = withValue("Record<ObjectKey,string>")(obj);
        const dictWithAny = withValue("Record<ObjectKey,unknown>")(obj);

        expect(dictWithStringValues).toEqual({ bar: { a: "hello", b: "world" } });
        expect(dictWithAny).toEqual({ bar: { a: "hello", b: "world" }, qux: { m: 42, n: 99 } });

        type cases = [
            Expect<AssertEqual<
                typeof dictWithStringValues,
                {
                    bar: {
                        a: "hello";
                        b: "world";
                    };
                }
            >>,
            Expect<AssertEqual<
                typeof dictWithAny,
                {
                    bar: {
                        a: "hello";
                        b: "world";
                    };
                    qux: {
                        m: 42;
                        n: 99;
                    };
                }
            >>,
        ];
    });

});

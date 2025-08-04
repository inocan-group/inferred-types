import { describe, it } from "vitest";
import {
    Dictionary,
    Expect,
    ObjectKeys,
    Test,
} from "inferred-types/types";
import { ObjectKey } from "inferred-types";

describe("ObjectKeys<T>", () => {

    it("wide objects", () => {
        type W1 = ObjectKeys<object>;
        //   ^?
        type W2 = ObjectKeys<Dictionary>;
        //   ^?
        type W3 = ObjectKeys<Record<string,string>>;
        //   ^?
        type W4 = ObjectKeys<Record<symbol,string>>;
        //   ^?


        type cases = [
            Expect<Test<W1, "equals", PropertyKey[]>>,
            Expect<Test<W2, "equals", ObjectKey[]>>,
            Expect<Test<W3, "equals", string[]>>,
            Expect<Test<W4, "equals", symbol[]>>,
        ];
    });

    it("narrow types", () => {
        type Foo = ObjectKeys<{ foo: 1 }>;
        //   ^?
        type Foobar = ObjectKeys<{ foo: 1; bar: 2 }>;
        //   ^?
        type FoobarWideVal = ObjectKeys<{ foo: number; bar: string }>;
        //   ^?
        type Foobar_RO = ObjectKeys<Readonly<{ foo: 1; bar: 2 }>>;
        //   ^?

        type cases = [
            Expect<Test<Foo, "equals", ["foo"]>>,
            Expect<Test<Foobar, "equals", ["foo","bar"]>>,
            Expect<Test<FoobarWideVal, "equals", ["foo","bar"]>>,
            Expect<Test<Foobar_RO, "equals", ["foo","bar"]>>,
        ];
    });


    it("optional keys are last", () => {
        type BarOpt = ObjectKeys<{ foo: 1, bar?: string, baz: 2 } >;
        //   ^?

        type cases = [
            Expect<Test<BarOpt, "equals", ["foo", "baz", ("bar" | undefined)?]>>
        ];
    });


    it("variadic key shape", () => {
        type Shape = ObjectKeys<Record<"foo" | `_${string}` | "bar", string>>
        //   ^?

        type cases = [
            Expect<Test<Shape, "equals", ["foo","bar", (`_${string}`|undefined)?]>>
        ];
    });


});

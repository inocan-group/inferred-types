import {
    Expect,
    DefineObject,
    FromDefn,
    TypeDefinition,
    FromDefineObject,
    Test
} from "inferred-types/types";

import { shape } from "inferred-types/runtime"

import { describe, it } from "vitest";


describe("FromDefineObject<T>", () => {

    type XX = FromDefn<{
        foo: "string",
        bar: "number",
        baz: "{{string}}foo"
    }>

    const s = shape(s => s.number());

    it("using SimpleTokens", () => {
        type Foo = FromDefineObject<{ foo: "number" }>;
        type OptFoo = FromDefineObject<{ foo: "Opt<number>" }>;
        type MaybeFoo = FromDefineObject<{ foo?: "number" }>;

        // @ts-ignore
        type cases = [
            Expect<Test<Foo, "equals", { foo: number }>>,
            Expect<Test<OptFoo, "equals", { foo: number | undefined }>>,
            Expect<Test<MaybeFoo, "equals", { foo?: number | undefined }>>,
        ];

    });
})



describe("FromDefn<T>", () => {

    it("happy path", () => {
        // pass through
        type Num = FromDefn<"Number(42)">;
        type ArrNum = FromDefn<[42, 56]>;
        type Obj = FromDefn<{ foo: 1 }>;

        // definitions
        const cb = <
            T extends readonly (TypeDefinition | DefineObject)[],
        >(...s: T) => s;

        const objDefn = cb({ foo: s => s.string("foo", "bar"), bar: "number(42)" });
        type ObjDefn = FromDefn<typeof objDefn>;


        type cases = [
            Expect<Test<Num, "equals", 42>>,
            Expect<Test<ArrNum, "equals", [42, 56]>>,
            Expect<Test<Obj, "equals", { foo: 1 }>>,

            Expect<Test<ObjDefn, "equals", [{ foo: "foo" | "bar"; bar: 42 }]>>,

        ];

    });


    it("using SimpleTokens for definition", () => {
        type Num = FromDefn<"number">;
        type Union = FromDefn<"number(4,5,6)">;


        // @ts-ignore
        type cases = [
            Expect<Test<Num, "equals", number>>,
            Expect<Test<Union, "equals", 4 | 5 | 6>>,
        ];

    });


    it.todo("using Shape callbacks for definition", () => {
        const cb = <T extends DefineObject>(defn: T) => defn as unknown as FromDefn<T>;

        const a = cb({
            foo: o => o.string("foo", "bar", "baz"),
            bar: o => o.string().militaryTime(),
            baz: "Opt<number>"
        });

        // @ts-ignore
        type cases = [
            /** type tests */
        ];

    });

});

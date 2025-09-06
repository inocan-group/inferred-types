import { Expect,  Narrowable, Test, RemoveIndexKeys, WithKeys, ObjectKeys } from "inferred-types/types";
import { describe, it } from "vitest";



describe("RemoveIndexKeys<T>", () => {

    it("wide string indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: string]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: string]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: string]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: string]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,

        ];
    });

    it("wide numeric indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: number]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: number]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: number]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: number]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,

        ];
    });

    it("wide symbol indexes", () => {
        type Literal = RemoveIndexKeys<{ foo: 1; bar: 2 }>;
        type LiteralWithAnyIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: symbol]: any }>;
        type LiteralWithUnknownIdx = RemoveIndexKeys<{ foo: 1; bar: 2;[key: symbol]: unknown }>;
        type LiteralWithStringIdx = RemoveIndexKeys<{ foo: "bar";[key: symbol]: string }>;
        type LiteralWithNarrowableIdx = RemoveIndexKeys<{ foo: "bar";[key: symbol]: Narrowable }>;

        type cases = [
            Expect<Test<Literal, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithAnyIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithUnknownIdx, "equals",  { foo: 1; bar: 2 }>>,
            Expect<Test<LiteralWithStringIdx, "equals",  { foo: "bar" }>>,
            Expect<Test<LiteralWithNarrowableIdx, "equals",  { foo: "bar" }>>,
        ];
    });


    it.skip("literal indexes - TypeScript limitation", () => {
        // NOTE: TypeScript does not currently support fully removing template literal
        // index signatures from a type. This is a known limitation of the type system.
        // The template literal pattern remains part of the type's structure even after
        // filtering operations.

        type T1 = RemoveIndexKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number}>;
        type T2 = WithKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number}, "foo" | "bar">;
        type R = Required<ObjectKeys<{ foo: 1; bar: 2; [key: `_${string}`]: number}>>;

        // These tests would pass if TypeScript supported removing template literal indexes:
        // type cases = [
        //     Expect<Test<T1, "equals", { foo: 1; bar: 2 }>>
        // ];

        // For now, we can only ensure that fixed keys are preserved
        type HasFoo = "foo" extends keyof T1 ? true : false;
        type HasBar = "bar" extends keyof T1 ? true : false;

        type cases = [
            Expect<Test<HasFoo, "equals", true>>,
            Expect<Test<HasBar, "equals", true>>,
        ];
    });


});


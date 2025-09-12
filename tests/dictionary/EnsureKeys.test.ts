import { Expect } from "@type-challenges/utils";
import { describe,  it } from "vitest";
import type { Dictionary, EmptyObject, EnsureKeys, Test } from "inferred-types/types";

describe("EnsureKeys<TContainer,TKeys,TType>", () => {

    it("happy path", () => {
        type Add = EnsureKeys<{ foo: 1 }, { bar: 3 }>;
        type Overlap = EnsureKeys<{ foo: 1 }, { foo: number; bar: 3 }>;
        type Conflict = EnsureKeys<{ foo: 1 }, { foo: string; bar: 3 }>;

        type A_FooBar = EnsureKeys<{ foo: 1 }, ["foo", "bar"]>;
        type A_FooBar2 = EnsureKeys<{}, ["foo", "bar"]>;

        type Obj = EnsureKeys<EmptyObject, ["foo"]>;
        type Obj2 = EnsureKeys<Dictionary, ["foo"]>;

        type cases = [
            Expect<Test<Add, "equals", { foo: 1; bar: 3 }>>,
            Expect<Test<Overlap, "equals", { foo: 1; bar: 3 }>>,
            Expect<Test<Conflict, "isError", "invalid-type">>,

            Expect<Test<A_FooBar, "equals", { foo: 1; bar: unknown }>>,
            Expect<Test<A_FooBar2, "equals", { foo: unknown; bar: unknown }>>,

            Expect<Test<Obj, "equals", { foo: unknown }>>,
            Expect<Test<Obj2, "equals", { foo: unknown }>>,
        ];

    });

    it("with wide container", () => {
        type Wide = EnsureKeys<Dictionary, {foo: number; bar: 3}>;
        type WideArr = EnsureKeys<Dictionary, ["foo", "bar"]>;

        type cases = [
            Expect<Test<Wide, "equals", { foo: number; bar: 3 }>>,
            Expect<Test<WideArr, "equals", { foo: unknown; bar: unknown }>>,

        ];
    });

});

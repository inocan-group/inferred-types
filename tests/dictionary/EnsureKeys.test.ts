import { Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { EnsureKeys, HasSameKeys, Test } from "inferred-types/types";


describe("EnsureKeys<TContainer,TKeys,TType>", () => {

    it("happy path", () => {
        type FooBar = EnsureKeys<{ foo: 1 }, { bar: 3 }>;
        type Overlap = EnsureKeys<{ foo: 1 }, { foo: number; bar: 3 }>;

        type A_FooBar = EnsureKeys<{ foo: 1 }, ["foo", "bar"]>
        type A_FooBar2 = EnsureKeys<{}, ["foo", "bar"]>;

        type Obj = EnsureKeys<NonNullable<unknown>, ["foo"]>;
        type Obj2 = EnsureKeys<object, ["foo"]>;

        type cases = [
            Expect<HasSameKeys<FooBar, { foo: 1; bar: 3 }>>,
            Expect<HasSameKeys<Overlap, { foo: 5; bar: 3 }>>,

            Expect<Test<A_FooBar, "equals", { foo: 1; bar: unknown }>>,
            Expect<Test<A_FooBar2, "equals", { foo: unknown; bar: unknown }>>,

            Expect<Test<Obj, "equals", { foo: unknown }>>,
            Expect<Test<Obj2, "equals", { foo: unknown }>>,
        ];

    });

});

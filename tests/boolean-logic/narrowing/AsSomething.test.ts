import { describe, it } from "vitest";
import { Expect, AsSomething, Test } from "inferred-types/types";



describe("AsSomething<T>", () => {

    it("happy path", () => {
        type Foo = AsSomething<"foo" | null>;
        type Foo2 = AsSomething<"foo" | undefined | null>;
        type Proxy = AsSomething<"foo">;
        type Never = AsSomething<null>;
        type Nada = AsSomething<null, "nada">;

        type cases = [
            Expect<Test<Foo, "equals",  "foo">>,
            Expect<Test<Foo2, "equals",  "foo">>,
            Expect<Test<Proxy, "equals",  "foo">>,
            Expect<Test<Never, "equals",  never>>,
            Expect<Test<Nada, "equals",  "nada">>,

        ];
    });

});

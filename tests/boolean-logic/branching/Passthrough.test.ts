import { Equal, Expect, ExpectFalse } from "@type-challenges/utils";
import { Passthrough } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Passthrough<TContent,TPass,THandle,TSpecificity>", () => {

    it("extends specificity", () => {
        type Foo = Passthrough<"foo", string, false>;
        type Foo2 = Passthrough<"foo", string, false, "extends">;
        type UFoo = Passthrough<"foo", string | number, false>;
        type NarrowFoo = Passthrough<"foo", "foo" | number, false>;

        type Union = Passthrough<"foo" | 42 | "bar", string, false>;
        type Removal = Passthrough<"foo" | 42 | "bar", string, never>;

        type Nope = Passthrough<"foo", number, false>;

        type cases = [
            Expect<Test<Foo, "equals",  "foo">>,
            Expect<Test<Foo2, "equals",  "foo">>,
            Expect<Test<UFoo, "equals",  "foo">>,
            Expect<Test<NarrowFoo, "equals",  "foo">>,

            Expect<Test<Union, "equals",  "foo" | "bar" | false>>,
            Expect<Test<Removal, "equals",  "foo" | "bar">>,

            ExpectFalse<Nope>
        ];
        const cases: cases = [
            true, true, true, true,
            true, true,
            false
        ];
    });


    it("equals specificity", () => {
        type TooWide = Passthrough<"foo", string, false, "equals">;
        type InReverse = Passthrough<string, "foo", false, "equals">;

        type Foo = Passthrough<"foo", "foo", false, "equals">;
        type NotFoo = Passthrough<"foo", "foo" | "bar", false, "equals">;

        type cases = [
            ExpectFalse<TooWide>,
            ExpectFalse<InReverse>,

            Expect<Test<Foo, "equals",  "foo">>,
            ExpectFalse<NotFoo>
        ];
        const cases: cases = [
            false, false,
            true, false,
        ];

    });


});

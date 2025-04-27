import { Expect, Handle, Test } from "inferred-types/types";
import { describe, it } from "vitest";



describe("Handle<TContent,TPass,THandle,TSpecificity>", () => {

    it("extends specificity", () => {
        type Foo = Handle<"bar", string, "foo">;

        type StillFoo = Handle<"foo", number, false>;
        type StillFoo2 = Handle<"foo", number, false, "extends">;
        type UFoo = Handle<"foo", boolean | number, false>;
        type NarrowFoo = Handle<"foo", "foo" | number, false>;

        type UnionHandler = Handle<42, "foo" | number | "bar", "union">;
        // content should narrow based on handler
        type UnionContent = Handle<"foo" | 42 | "bar", number, never>;

        type Nope = Handle<"foo", string, false>;

        type cases = [
            Expect<Test<Foo, "equals",  "foo">>,

            Expect<Test<StillFoo, "equals",  "foo">>,
            Expect<Test<StillFoo2, "equals",  "foo">>,
            Expect<Test<UFoo, "equals",  "foo">>,
            Expect<Test<NarrowFoo, "equals", false>>,

            Expect<Test<UnionHandler, "equals",  "union">>,
            Expect<Test<UnionContent, "equals",  "foo" | "bar">>,

            Expect<Test<Nope, "equals", false>>,
        ];
    });


    it("equals specificity", () => {
        type WideCondition = Handle<"foo", string, "handled", "equals">;
        type WideValue = Handle<string, "foo", "handled", "equals">;

        type Foo = Handle<"foo", "foo", "handled", "equals">;
        type UnhandledFoo = Handle<"foo", "foo" | "bar", "handled", "equals">;

        type cases = [
            Expect<Test<WideCondition, "equals",  "foo">>,
            Expect<Test<WideValue, "equals",  string>>,

            Expect<Test<Foo, "equals",  "handled">>,
            Expect<Test<UnhandledFoo, "equals",  "foo">>,
        ];
        const cases: cases = [
            true, true,
            true, true,
        ];
    });


    it("using equals for boolean handling", () => {
        type BoolIsTrue = Handle<boolean, boolean, true, "equals">;

        type cases = [
            Expect<Test<BoolIsTrue, "equals",  true>>
        ];
        const cases: cases = [
            true
        ];

    });

});

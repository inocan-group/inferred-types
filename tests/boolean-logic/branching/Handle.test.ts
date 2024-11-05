import { Equal, Expect, ExpectFalse } from "@type-challenges/utils";
import { Handle } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Handle<TContent,TPass,THandle,TSpecificity>", () => {

  it("extends specificity", () => {
    type Foo = Handle<"bar", string, "foo">;

    type StillFoo = Handle<"foo", number, false>;
    type StillFoo2 = Handle<"foo", number, false, "extends">;
    type UFoo = Handle<"foo", boolean | number, false>;
    type NarrowFoo = Handle<"foo", "foo" | number, false>;

    type UnionHandler = Handle<42, "foo" | number | "bar", "union">;
    // content should narrow based on handler
    type UnionContent = Handle<"foo" | 42 | "bar", number , never>;

    type Nope = Handle<"foo", string, false>;

    type cases = [
      Expect<Equal<Foo, "foo">>,

      Expect<Equal<StillFoo, "foo">>,
      Expect<Equal<StillFoo2, "foo">>,
      Expect<Equal<UFoo, "foo">>,
      ExpectFalse<NarrowFoo>,

      Expect<Equal<UnionHandler, "union">>,
      Expect<Equal<UnionContent, "foo" | "bar">>,

      ExpectFalse<Nope>
    ];
    const cases: cases = [
      true,
      true, true, true, false,
      true, true,
      false
    ];
  });


  it("equals specificity", () => {
    type WideCondition = Handle<"foo", string, "handled", "equals">;
    type WideValue = Handle<string, "foo", "handled", "equals">;

    type Foo = Handle<"foo", "foo", "handled", "equals">;
    type UnhandledFoo = Handle<"foo", "foo" | "bar", "handled", "equals">;

    type cases = [
      Expect<Equal<WideCondition, "foo">>,
      Expect<Equal<WideValue, string>>,

      Expect<Equal<Foo, "handled">>,
      Expect<Equal<UnhandledFoo, "foo">>,
    ];
    const cases: cases = [
      true, true,
      true, true,
    ];
  });


  it("using equals for boolean handling", () => {
    type BoolIsTrue = Handle<boolean, boolean, true, "equals">;

    type cases = [
      Expect<Equal<BoolIsTrue, true>>
    ];
    const cases: cases = [
      true
    ];

  });



});

import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { AsSomething } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("AsSomething<T>", () => {

  it("happy path", () => {
    type Foo = AsSomething<"foo" | null>;
    type Foo2 = AsSomething<"foo" | undefined | null>;
    type Proxy = AsSomething<"foo">;
    type Never = AsSomething<null>;
    type Nada = AsSomething<null, "nada">;

    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<Foo2, "foo">>,
      Expect<Equal<Proxy, "foo">>,
      Expect<Equal<Never, never>>,
      Expect<Equal<Nada, "nada">>,

    ];
    const cases: cases = [
      true, true, true, true, true
    ];
  });

});

import { Equal, Expect } from "@type-challenges/utils";
import { Retain } from "types/Retain";
import { describe, it, expect } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Retain<T, U> utility", () => {
  it("extends setting (the default)", () => {
    type Foo1 = Retain<string, string | number>;
    type Foo2 = Retain<"foo", string | number>;
    type NotFoo = Retain<string, number>;
    type TheAnswer = Retain<42, number>;
    type CloseNoCigar = Retain<42, 41 | 43>;

    type cases = [
      Expect<Equal<Foo1, string>>, //
      Expect<Equal<Foo2, "foo">>,
      Expect<Equal<NotFoo, never>>,
      Expect<Equal<TheAnswer, 42>>,
      Expect<Equal<CloseNoCigar, never>>,
    ];
    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("using the optional 'equality' feature", () => {
    type Foo0 = Retain<string | number, string | number, true>;
    type Foo1 = Retain<string, string | number, true>;
    type Foo2 = Retain<"foo", string | number, true>;
    type Foo3 = Retain<"foo", "foo", true>;
    type NotFoo = Retain<string, number, true>;
    type TheAnswer = Retain<42, 42, true>;
    type CloseNoCigar = Retain<42, 41 | 42 | 43, true>;

    type cases = [
      Expect<Equal<Foo0, string | number>>, //
      Expect<Equal<Foo1, never>>,
      Expect<Equal<Foo2, never>>,
      Expect<Equal<Foo3, "foo">>,
      Expect<Equal<NotFoo, never>>,
      Expect<Equal<TheAnswer, 42>>,
      Expect<Equal<CloseNoCigar, never>>,
    ];
    const c: cases = [true, true, true, true, true, true, true];
    expect(c).toBe(c);
  });
});

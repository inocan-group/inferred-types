import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { WithDefault } from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("WithDefault<T,D>", () => {

  it("with default policy for default values", () => {
    type Foo = WithDefault<"foo", "bar">;
    type Bar = WithDefault<null,"bar">;
    type Bar2 = WithDefault<undefined,"bar">;
    type Empty = WithDefault<"","bar">;

    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<Bar, "bar">>,
      Expect<Equal<Bar2, "bar">>,
      Expect<Equal<Empty, "">>,
    ];
    const cases: cases = [true, true, true, true  ];
  });

  it("with falsy policy for default values", () => {
    type Foo = WithDefault<"foo", "bar", "falsy">;
    type Bar = WithDefault<null,"bar", "falsy">;
    type Bar2 = WithDefault<undefined,"bar", "falsy">;
    type Empty = WithDefault<"","bar", "falsy">;

    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<Bar, "bar">>,
      Expect<Equal<Bar2, "bar">>,
      Expect<Equal<Empty, "bar">>,
    ];
    const cases: cases = [true, true, true, true  ];
  });

});

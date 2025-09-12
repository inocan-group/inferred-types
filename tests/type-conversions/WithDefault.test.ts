import { describe, it } from "vitest";
import type { Expect, Test, WithDefault } from "inferred-types/types";

describe("WithDefault<T,D>", () => {

  it("with default policy for default values", () => {
    type Foo = WithDefault<"foo", "bar">;
    type Bar = WithDefault<null, "bar">;
    type Bar2 = WithDefault<undefined, "bar">;
    type Empty = WithDefault<"", "bar">;

    type cases = [
      Expect<Test<Foo, "equals",  "foo">>,
      Expect<Test<Bar, "equals",  "bar">>,
      Expect<Test<Bar2, "equals",  "bar">>,
      Expect<Test<Empty, "equals",  "">>,
    ];
  });

  it("with falsy policy for default values", () => {
    type Foo = WithDefault<"foo", "bar", "falsy">;
    type Bar = WithDefault<null, "bar", "falsy">;
    type Bar2 = WithDefault<undefined, "bar", "falsy">;
    type Empty = WithDefault<"", "bar", "falsy">;

    type cases = [
      Expect<Test<Foo, "equals",  "foo">>,
      Expect<Test<Bar, "equals",  "bar">>,
      Expect<Test<Bar2, "equals",  "bar">>,
      Expect<Test<Empty, "equals",  "bar">>,
    ];
  });

});

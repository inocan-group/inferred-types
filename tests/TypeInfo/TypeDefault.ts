import { describe, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { TypeDefault } from "src/types/TypeInfo/TypeDefault";
import { literal } from "src/utility/literals";

describe("TypeDefault<T,D>", () => {
  it("T/D as dictionary", () => {
    type T = { foo?: "foo" | "fooy" | undefined; bar?: 42 | 53 | undefined };
    type D = { foo: "foo"; bar: 42 };
    type V = TypeDefault<T, D>;
    const t1 = literal({ foo: undefined, bar: 56 });
    type V1 = TypeDefault<typeof t1, D>;
    const t2 = { foo: undefined, bar: 56 };
    type V2 = TypeDefault<typeof t2, D>;

    type cases = [
      // D's props all extend T
      Expect<Equal<V, D>>,
      // foo is inherited from default, bar keeps literal type from T
      Expect<Equal<V1, { foo: "foo"; bar: 56 }>>,
      // bar is widened to "number" because that's the resolution T had
      Expect<Equal<V2, { foo: "foo"; bar: number }>>
    ];
    const cases: cases = [true, true, true];
  });
  it("T is undefined, D is a dictionary", () => {
    type T = undefined;
    type D = { foo: "foo"; bar: 42 };
    type V = TypeDefault<T, D>;

    type cases = [
      // the value's type is converted to the default
      Expect<Equal<V, D>>
    ];
    const cases: cases = [true];
  });
});

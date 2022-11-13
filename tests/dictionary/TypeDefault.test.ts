import { describe, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { TypeDefault } from "src/types/type-checks/TypeDefault";
import { literal } from "src/runtime/literals";

describe("TypeDefault<T,D>", () => {
  it("T/D as dictionary", () => {
    type T = { foo?: "foo" | "fooy" | undefined; bar?: 42 | 53 | undefined };
    type D = { foo: "foo"; bar: 42 };
    type V = TypeDefault<T, D>;
    const t1 = literal({ foo: undefined, bar: 56 });
    type V1 = TypeDefault<typeof t1, D>;
    const t2 = { foo: undefined, bar: 56 };
    type V2 = TypeDefault<typeof t2, D>;
    // const t3 = { bar: 56, baz: "hello" } as const;
    // type _V3 = TypeDefault<typeof t3, D>;

    type cases = [
      // D's props all extend T
      Expect<Equal<V, D>>,
      // foo is inherited from default, bar keeps literal type from T
      Expect<Equal<V1, { foo: "foo"; bar: 56 }>>,
      // bar is widened to "number" because that's the resolution T had
      Expect<Equal<V2, { foo: "foo"; bar: number }>>
      // the T prop has the prop "baz" which did not exist on D
      // TODO: this last test SHOULD work but doesn't yet
      // Expect<Equal<V3, { foo: "foo"; bar: 56; baz: "hello" }>>
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

  it("T and D are scalars", () => {
    type T1 = 5;
    type D1 = 8;
    type V1 = TypeDefault<T1, D1>;

    type T2 = "foo";
    type D2 = "bar";
    type V2 = TypeDefault<T2, D2>;

    type T3 = undefined;
    type D3 = "bar";
    type V3 = TypeDefault<T3, D3>;

    type cases = [
      Expect<Equal<V1, 5>>, //
      Expect<Equal<V2, "foo">>,
      Expect<Equal<V3, "bar">>
    ];

    const cases: cases = [true, true, true];
  });

  it("Property includes a function", () => {
    type T1 = { foo: "foo"; bar: undefined };
    type D1 = { foo: "bar"; bar: () => "hello" };
    type V1 = TypeDefault<T1, D1>;

    type cases = [
      Expect<Equal<V1["foo"], "foo">>, //
      Expect<Equal<V1["bar"], () => "hello">>
    ];
    const cases: cases = [true, true];
  });
});

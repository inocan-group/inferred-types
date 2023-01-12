import { describe, expect, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { literal } from "src/runtime/literals";
import { mergeWithDefaults } from "src/runtime/dictionary/merge";
import { Merge } from "src/types/type-conversion/Merge";

describe("MergeWithDefaults<T,D>", () => {
  it("T/D as dictionary", () => {
    type T = { foo?: "foo" | "fooy" | undefined; bar?: 42 | 53 | undefined };
    type D = { foo: "foo"; bar: 42 };
    type V = Merge<T, D>;
    const t1 = literal({ foo: undefined, bar: 56 });
    type V1 = Merge<typeof t1, D>;
    const t2 = { foo: undefined, bar: 56 };
    type V2 = Merge<typeof t2, D>;
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
    type V = Merge<T, D>;

    type cases = [
      // the value's type is converted to the default
      Expect<Equal<V, D>>
    ];
    const cases: cases = [true];
  });

  it("T and D are scalars", () => {
    type T1 = 5;
    type D1 = 8;
    type V1 = Merge<T1, D1>;

    type T2 = "foo";
    type D2 = "bar";
    type V2 = Merge<T2, D2>;

    type T3 = undefined;
    type D3 = "bar";
    type V3 = Merge<T3, D3>;

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
    type V1 = Merge<T1, D1>;

    type cases = [
      Expect<Equal<V1["foo"], "foo">>, //
      Expect<Equal<V1["bar"], () => "hello">>
    ];
    const cases: cases = [true, true];
  });
});

describe("merge() utility", () => {
  it("merge to scalars/undefined", () => {
    const m1 = mergeWithDefaults(undefined, 6);
    const m2 = mergeWithDefaults(42, 6);

    expect(m1).toBe(6);
    expect(m2).toBe(42);

    type cases = [
      Expect<Equal<typeof m1, 6>>, //
      Expect<Equal<typeof m2, 42>>
    ];
    const cases: cases = [true, true];
  });

  it("merge two objects", () => {
    const o1 = mergeWithDefaults(
      { foo: "foo", baz: false, color: { fav: undefined, next: "green" } } as const,
      { foo: "bar", bar: 42, color: { fav: "red", next: "" as string } } as const
    );
    type O1 = typeof o1;

    // runtime
    expect(o1.foo).toBe("foo");
    expect(o1.baz).toEqual(false);
    expect(o1.bar).toBe(42);
    expect(o1.color.fav).toBe("red");
    expect(o1.color.next).toBe("green");

    // design time
    type cases = [
      // while both props have a "foo", the value's is sufficient and default is ignored
      Expect<Equal<O1["foo"], "foo">>,
      // props in value but missing in default value are still valid
      Expect<Equal<O1["baz"], false>>, 
      Expect<Equal<O1["bar"], 42>>,
      Expect<Equal<O1["color"], { fav: "red"; next: "green" }>>
    ];
    const cases: cases = [true, true, true];
  });
});

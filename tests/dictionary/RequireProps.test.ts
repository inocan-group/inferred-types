import { describe, it, expect } from "vitest";
import type { Expect, Equal } from "@type-challenges/utils";

import { RequireProps } from "src/types/dictionary";

describe("RequireProps<T,R>", () => {
  it("works as expected", () => {
    type Start = { foo?: string; bar?: number };
    type Foo = RequireProps<Start, "foo">;
    type Bar = RequireProps<Start, "bar">;
    type Both = RequireProps<Start, "foo" | "bar">;

    type cases = [
      Expect<Equal<Foo, { foo: string; bar?: number }>>,
      Expect<Equal<Bar, { foo?: string; bar: number }>>,
      Expect<Equal<Both, { foo: string; bar: number }>>
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });
});

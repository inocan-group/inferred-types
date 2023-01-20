import { Equal, Expect, } from "@type-challenges/utils";
import { AlphaNumeric } from "src/types/string-literals/alpha-characters";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AlphaNumeric<T>", () => {
  const builder = <S extends string>(input: S & AlphaNumeric<S>) => input as AlphaNumeric<S>;

  it("happy path", () => {
    const a1 = "foobar" as const;
    const t1 = builder(a1);
    type T1a = AlphaNumeric<typeof a1>;
    type T1t = AlphaNumeric<typeof t1>;

    type Valid = AlphaNumeric<"foobar">;
    type Invalid = AlphaNumeric<"foo_bar">;

    type cases = [
      Expect<Equal<T1a, T1t>>,//
      Expect<Equal<Valid, "foobar">>,
      Expect<Equal<Invalid, never>>,
    ];
    const cases: cases = [true, true, true];
  });

});

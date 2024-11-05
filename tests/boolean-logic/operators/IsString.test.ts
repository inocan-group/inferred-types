import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { IsString } from "inferred-types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("IsString<T>", () => {

  it("happy path", () => {
    type Wide = IsString<string>;
    type Literal = IsString<"foo">;
    type Num = IsString<42>;
    type Arr = IsString<[]>;

    type cases = [
      ExpectTrue<Wide>,
      ExpectTrue<Literal>,

      ExpectFalse<Num>,
      ExpectFalse<Arr>,

    ];
    const cases: cases = [
      true, true,
      false, false,
    ];
  });


  it("Union Types", () => {
    type StrUnion = IsString<"foo" | "bar">;
    type MixedUnion = IsString<"foo" | 42>;
    type NonStrUnion = IsString<42 | 56 | false>;


    type cases = [
      ExpectTrue<StrUnion>,
      Expect<Equal<MixedUnion, boolean>>,
      ExpectFalse<NonStrUnion>,
    ];
    const cases: cases = [
      true, true, false,
    ];

  });


});

;import { Equal, Expect } from "@type-challenges/utils";
import { Add } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Add<A,B>", () => {

  it("happy path", () => {
    type Three = Add<1,2>;
    type OneHundred = Add<40,60>;

    type cases = [
      Expect<Equal<Three, 3>>,
      Expect<Equal<OneHundred, 100>>
    ];
    const cases: cases = [ true, true ];
  });


  it("adding where one operand is a string literal", () => {
    type Three = Add<"1",2>;
    type OneHundred = Add<40,"60">;

    type cases = [
      Expect<Equal<Three, "3">>,
      Expect<Equal<OneHundred, 100>>
    ];
    const cases: cases = [ true, true ];
  });

  it("adding where both operands are a string literals", () => {
    type Three = Add<"1","2">;
    type OneHundred = Add<"40","60">;

    type cases = [
      Expect<Equal<Three, "3">>,
      Expect<Equal<OneHundred, "100">>
    ];
    const cases: cases = [ true, true ];
  });


  it("First operand is negative", () => {
    type Three = Add< -2, 5>;
    type ThreeStr = Add<"-2","5">;

    type cases = [
      Expect<Equal<Three, 3>>,
      Expect<Equal<ThreeStr, "3">>
    ];
    const cases: cases = [ true, true ];
  });

  it("Second operand is negative", () => {
    type Three = Add< 5, -2>;
    type ThreeStr = Add<"5",-2>;

    type cases = [
      Expect<Equal<Three, 3>>,
      Expect<Equal<ThreeStr, "3">>
    ];
    const cases: cases = [ true, true ];
  });

  it("adding two negative operands", () => {
    type NegThree = Add< -1, -2 >;
    type NegOneHundred = Add<"-40","-60">;

    type cases = [
      Expect<Equal<NegThree, -3>>,
      Expect<Equal<NegOneHundred, "-100">>
    ];
    const cases: cases = [ true, true ];
  });

});

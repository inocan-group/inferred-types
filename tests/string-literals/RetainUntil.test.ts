import { describe, expect, it } from "vitest";
import { Expect, NumericChar, RetainUntil, Test } from "inferred-types/types";
import { retainUntil, retainUntilInclusive } from "inferred-types/runtime";
import { NUMERIC_CHAR } from "inferred-types/constants";


describe("RetainUntil<TContent,TComparator>", () => {

  it("happy path", () => {
    type UntilNum = RetainUntil<"Hello World456der", NumericChar>;

    type cases = [
      Expect<Test<UntilNum, "equals",  "Hello World">>,
    ];

  });
});


describe("retainUntil(content, ...find) runtime", () => {

  it("happy path", () => {
    const hello = retainUntil("Hello World456der", ...NUMERIC_CHAR);
    expect(hello).toEqual("Hello World");
    const nada = retainUntil("456Hello", ...NUMERIC_CHAR);
    expect(nada).toEqual("");
    const whoCares = retainUntil("Hello World", ...NUMERIC_CHAR)
    expect(whoCares).toEqual("Hello World");

    type cases = [
      Expect<Test<typeof hello, "equals",  "Hello World">>,
      Expect<Test<typeof nada, "equals",  "">>,
      Expect<Test<typeof whoCares, "equals",  "Hello World">>,
    ];
  });
});


describe("retainUntilInclusive(content, ...find)", () => {

  it("happy path", () => {
    const hello = retainUntilInclusive("Hello World456der", ...NUMERIC_CHAR);
    expect(hello).toEqual("Hello World4");
    const nada = retainUntilInclusive("456Hello", ...NUMERIC_CHAR);
    expect(nada).toEqual("4");
    const whoCares = retainUntilInclusive("Hello World", ...NUMERIC_CHAR)
    expect(whoCares).toEqual("Hello World");

    type cases = [
      Expect<Test<typeof hello, "equals",  "Hello World4">>,
      Expect<Test<typeof nada, "equals",  "4">>,
      Expect<Test<typeof whoCares, "equals",  "Hello World">>,
    ];
  });

});



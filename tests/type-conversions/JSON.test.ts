import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { JsonValue, JsonValues } from "@inferred-types/types";
import { jsonValue } from "src/runtime/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("JsonValue<T>", () => {

  it("happy path", () => {
    type Str = JsonValue<"foo">;
    type True = JsonValue<"true">;
    type Num = JsonValue<"42">;

    type cases = [
      Expect<Equal<Str, "\"foo\"">>,
      Expect<Equal<True, true >>,
      Expect<Equal<Num, 42>>,
    ];
    const cases: cases = [
      true, true, true
    ];
  });

});

describe("JsonValues<T>", () => {

  it("happy path", () => {
    type StrTup = JsonValues<["foo","bar"]>
    type Mixed = JsonValues<["true", "false", 42, "bar"]>;

    type cases = [
      Expect<Equal<StrTup, [ "\"foo\"", "\"bar\""]>>,
      Expect<Equal<Mixed, [ true, false, 42, "\"bar\""]>>,

    ];
    const cases: cases = [ true, true ];
  });

});

describe("jsonValue() and jsonValues() runtime", () => {

  it("happy path", () => {
    const str = jsonValue("foo");
    const truth = jsonValue("true");
    const num = jsonValue("42");

    expect(str).toBe("\"foo\"");
    expect(truth).toBe(true);
    expect(num).toBe(42);
  });

});

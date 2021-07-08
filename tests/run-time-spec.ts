import { Equal, Expect } from "@type-challenges/utils";
import { TypeGuard } from "~/types";
import { number, string } from "~/utility/runtime";

describe("run-time types", () => {

  it("string()", () => {
    const s = string();
    type S = typeof s;

    expect(s.type).toBe("string");

    type cases = [
      Expect<Equal<S["__kind"], "type">>,
      Expect<Equal<S["type"], string>>,
      Expect<Equal<S["is"], TypeGuard<string>>>
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

  it("number()", () => {
    const n = number();
    type N = typeof n;

    expect(n.type).toBe("number");

    type cases = [
      Expect<Equal<N["__kind"], "type">>,
      Expect<Equal<N["type"], number>>,
      Expect<Equal<N["is"], TypeGuard<number>>>
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

  it("empty object()", () => {
    // const o = object();
    // type O = typeof o;
  });



});
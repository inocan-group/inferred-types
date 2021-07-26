import { Equal, Expect } from "@type-challenges/utils";
import { HasUppercase } from "~/types";

describe("HasUppercase<T> type utility", () => {

  it("finds capitals where they exist", () => {
    type T1 = HasUppercase<"Yup">;
    type T2 = HasUppercase<"yUp">;
    type T3 = HasUppercase<"YUP">;

    type cases = [
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
    ];
    const c: cases = [true, true, true];
    expect(c).toBe(c);
  });

  it("correctly identifies the absence of capitals", () => {
    type T1 = HasUppercase<"nope">;
    type T2 = HasUppercase<"  noo nooo noooooooooooooo">;

    type cases = [
      Expect<Equal<T1, false>>,
      Expect<Equal<T2, false>>,
    ];
    const c: cases = [true, true];
    expect(c).toBe(c);
  });

  it("when passed a non literal string, returns 'unknown'", () => {
    type T1 = HasUppercase<string>;

    type cases = [
      Expect<Equal<T1, "unknown">>,
    ];
    const c: cases = [true];
    expect(c).toBe(c);
  });

});

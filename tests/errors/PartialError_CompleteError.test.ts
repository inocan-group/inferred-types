import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { CompleteError, EmptyObject,  PartialError } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("PartialError<> and CompleteError<>", () => {

  it("first test", () => {
    type P1 = PartialError<{kind: "p1"; message: "p1 err"}>;
    type P2 = PartialError<{kind: "p2"; library: "inferred-types"}>;

    type C1 = CompleteError<P1, EmptyObject, {id: 1}>;
    type C2 = CompleteError<P2, {message: "hi"}>;

    type cases = [
      Expect<Equal<C1, {
        __kind: "ErrorCondition";
        kind: "p1";
        msg: "p1 err";
        id: 1;
      }>>,
      Expect<Equal<C2, {
        __kind: "ErrorCondition";
        kind: "p2";
        msg: "hi";
        library: "inferred-types";
      }>>,
    ];
    const cases: cases = [
      true, true
    ];
  });

});

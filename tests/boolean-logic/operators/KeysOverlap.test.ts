import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { KeysOverlap } from "inferred-types/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("KeysOverlap<A,B>", () => {

  it("happy path", () => {
    type T1 = KeysOverlap<{foo: 1}, {foo: 2}>;
    type T2 = KeysOverlap<{foo: 1; bar: 2}, {bax: "hi", bar: "bye"}>;


    type F1 = KeysOverlap<{foo: 1}, {bar: 1}>;
    type F2 = KeysOverlap<{foo: 1}, {}>;
    type F3 = KeysOverlap<{}, {foo: 1}>;

    // @ts-ignore
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,

      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
    ];
  });

});

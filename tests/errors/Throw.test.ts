import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ErrorCondition, Extends, IsErrorCondition, MapError, ProxyError, Throw } from "@inferred-types/types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Throw<TKind,TMessage,TUtility,TRest>", () => {

  it("happy path", () => {
    type Simple = Throw<"my-error">;


    type cases = [
      Expect<Equal<Simple, {__kind: "ErrorCondition"; kind: "my-error"}>>,
      ExpectTrue<Extends<Simple, ErrorCondition>>,
      ExpectTrue<Extends<Simple, ErrorCondition<"my-error">>>,
      ExpectTrue<IsErrorCondition<Simple>>,
      ExpectTrue<IsErrorCondition<Simple, "my-error">>,

    ];
    const cases: cases = [
      true, true, true, true, true,
    ];
  });


  it("Use of Utility and underlying error", () => {
    type Origin = Throw<"origin", "The original error", "Origin<T>">;
    type Bubbles = Throw<"bubbles", "Uh oh!", "Bubbles<T>", { underlying: Origin }>;
    type Flat = Throw<"flat", never, never, {underlying: Origin} >;

    type cases = [
      Expect<Equal<Origin["utility"], "Origin<T>">>,
      Expect<Equal<Bubbles["utility"], "Bubbles<T>">>,

      Expect<Equal<Origin["stack"],  ["Origin<T>"]>>,
      Expect<Equal<Bubbles["stack"],  ["Bubbles<T>", "Origin<T>"]>>,
      Expect<Equal<Flat["stack"],  ["unspecified", "Origin<T>"]>>,
    ];
    const cases: cases = [
      true, true,
      true, true, true
    ];

  });


  it("Using ProxyError to establish underlying error", () => {
    type Origin = Throw<"origin", "The original error", "Origin<T>">;
    type Bubbles = ProxyError<Origin, "Bubbles<T>","T">;

    type cases = [
      Expect<Equal<Bubbles["stack"],  ["Bubbles<T>", "Origin<T>"]>>,
      Expect<Equal<Bubbles["kind"], "origin">>
    ];
    const cases: cases = [
      true, true
    ];

  });


  it("Using MapError to establish underlying error", () => {
    type Origin = Throw<"origin", "The original error", "Origin<T>">;
    type Bubbles = MapError<Origin, "oh-shit", "Bubbles<T>","T">;

    type cases = [
      Expect<Equal<Bubbles["stack"],  ["Bubbles<T>", "Origin<T>"]>>,
      Expect<Equal<Bubbles["kind"], "oh-shit">>
    ];
    const cases: cases = [
      true, true
    ];
  });



});

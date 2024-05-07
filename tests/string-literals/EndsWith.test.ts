import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { EndsWith } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("EndsWith<TValue,TTest>", () => {

  it("happy path", () => {
    type Bar = EndsWith<"foobar", "bar">;
    type NoBar = EndsWith<"barfoo", "bar">;

    type MultiFoo = EndsWith<"foobar", ["foo", "bar"]>;
    type NotMultiFoo = EndsWith<"foobar", ["foo", "baz"]>;

    type Num = EndsWith<420,20>;
    type NotNum = EndsWith<520,42>;
    
    type cases = [
      ExpectTrue<Bar>,
      ExpectFalse<NoBar>,

      ExpectTrue<MultiFoo>,
      ExpectFalse<NotMultiFoo>,

      ExpectTrue<Num>,
      ExpectFalse<NotNum>
    ];
    const cases: cases = [ 
      true, false, 
      true, false,
      true, false
    ];
  });

});

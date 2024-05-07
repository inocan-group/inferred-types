import { ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { StartsWith, UpperAlphaChar } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("StartsWith<TValue,TTest>", () => {

  it("happy path", () => {
    type Foo = StartsWith<"foobar", "foo">;
    type NoFoo = StartsWith<"barfoo", "foo">;

    type MultiFoo = StartsWith<"foobar", ["foo", "bar"]>;
    type NotMultiFoo = StartsWith<"foobar", ["bar", "baz"]>;

    type Num = StartsWith<420,42>;
    type NotNum = StartsWith<520,42>;

    type Upper = StartsWith<"Bar", UpperAlphaChar>;
    type NotUpper = StartsWith<"bar", UpperAlphaChar>;
    
    type cases = [
      ExpectTrue<Foo>,
      ExpectFalse<NoFoo>,

      ExpectTrue<MultiFoo>,
      ExpectFalse<NotMultiFoo>,

      ExpectTrue<Num>,
      ExpectFalse<NotNum>,

      ExpectTrue<Upper>,
      ExpectFalse<NotUpper>,
    ];
    const cases: cases = [ 
      true, false, 
      true, false,
      true, false,
      true, false,
    ];
  });

});

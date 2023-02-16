/* eslint-disable @typescript-eslint/ban-types */
import { describe, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { Ref } from "vue";
import { DotPathFor } from "src/types/string-literals/character-sets";
import { Suggest } from "src/types/string-literals";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Name", () => {
  type myRef = Ref<{ age: number; address: string }>;
  type Obj = {
    foo: 1;
    bar: number[];
    baz: {
      a: string;
      b: string;
      c: {
        ca: 1;
        cb: 2;
        cc: string[];
      };
    };
    color: [number, string, number];
    info: myRef;
  };
  
  it("null is a valid dotpath and target", () => {
    type NullTarget = DotPathFor<null>;

    type cases = [
      // when the target is a null then the suggested dotpath is the same
      Expect<Equal<NullTarget, null>>,
    ];
    const cases: cases = [ true ];
  });
  
  it("using an object as target", () => {
    type TObj = DotPathFor<Obj>;
    type Suggestion = Suggest<TObj>;

    type Expected = "foo" | "bar" | "baz" | "color" | "info" | `bar.${number}` | "baz.a" | "baz.b" | "baz.c" | "color.0" | "color.1" | "color.2" | "info.age" | "info.address";

    type cases = [
      // native return is a union type of string literals
      Expect<Equal<TObj,Expected>>,
      // wrapping with Suggest<T> allows a non-suggested string to be valid
      Expect<Equal<Suggestion,Expected | (string & {})>>,
    ];
    const cases: cases = [ true, true ];
  });

  it("using an array target", () => {
    type ExampleArr = DotPathFor<readonly ["foo", "bar", "baz"]>;
    type Suggestion = Suggest<ExampleArr>;

    type Expected =  "0" | "1" | "2";

    type cases = [
      Expect<Equal<ExampleArr, Expected>>,
      Expect<Equal<Suggestion, Expected | (string & {})>>, //
    ];
    const cases: cases = [ true,true ];
  });
  
});


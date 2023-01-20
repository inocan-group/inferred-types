import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { DotPathFor } from "src/types/alphabetic/DotPathFor";
import {  DoesExtend } from "src/types/boolean-logic";
import { describe, it } from "vitest";
import { Ref } from "vue";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Name", () => {

  it("object base", () => {
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

    type DPath = DotPathFor<Obj>; 
    
    type cases = [
      Expect<ExpectTrue<DoesExtend<"foo", DPath>>>,
      Expect<ExpectTrue<DoesExtend<"bar", DPath>>>,
      Expect<ExpectTrue<DoesExtend<"baz", DPath>>>,
      Expect<ExpectTrue<DoesExtend<"color", DPath>>>,
      Expect<ExpectTrue<DoesExtend<"info", DPath>>>,
      Expect<ExpectTrue<DoesExtend<`bar.${number}`, DPath>>>,
      Expect<ExpectTrue<DoesExtend<`info.age`, DPath>>>,
      Expect<ExpectTrue<DoesExtend<`info.address`, DPath>>>,
      Expect<ExpectTrue<DoesExtend<`color.0`, DPath>>>,
      Expect<ExpectTrue<DoesExtend<`color.2`, DPath>>>,
      Expect<Equal<DoesExtend<DPath, `color.3`>, false>>,
    ];
    const cases: cases = [ 
      true, true, true, 
      true, true, true, 
      true, true, true, 
      true, true 
    ];
  });

});


import {  Expect } from "@type-challenges/utils";
import { Contains, } from "src/types";
import { ContainerPaths } from "src/types/type-conversion/ContainerPaths";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ContainerPaths<T>", () => {

  it("happy path", () => {
    type Obj = {
      foo: 1;
      bar: {
        a: "str";
        b: "another str";
      };
      arr: [
        {inside: true; outside: true},
        1,2,3
      ];
      emptyArr: string[];
      emptyObj: object;
      deep: {
        deeper: {
          prop: 42;
        };
      };
    };

    type ScalarPaths = ContainerPaths<42>;
    type NullPaths = ContainerPaths<null>;
    type ObjPaths = ContainerPaths<Obj>;
    
    type cases = [
      Expect<Contains<ScalarPaths, "">>,
      Expect<Contains<ScalarPaths, null>>,
      Expect<Contains<NullPaths, "">>,
      Expect<Contains<NullPaths, null>>,
      Expect<Contains<ObjPaths, "">>,
      Expect<Contains<ObjPaths, null>>,

      Expect<Contains<ObjPaths, "foo">>,
      Expect<Contains<ObjPaths, "bar.a">>,
      Expect<Contains<ObjPaths, "bar.b">>,

      Expect<Contains<ObjPaths, "arr.0.inside">>,
      Expect<Contains<ObjPaths, "arr.1">>,
      Expect<Contains<ObjPaths, "arr.2">>,
    ];
    const cases: cases = [ 
      true, true, true, true,
      true, true, true,
      true, true, true,
    ];
  });

});

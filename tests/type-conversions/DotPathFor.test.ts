/* eslint-disable @typescript-eslint/ban-types */
import { describe, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { Ref } from "vue";
import { DoesExtend,  DotPathFor , Suggest } from "src/types";

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
      Expect<Equal<NullTarget, "">>,
    ];
    const cases: cases = [ true ];
  });
  
  it("using an object as target", () => {
    type TObj = DotPathFor<Obj>;
    type Suggestion = Suggest<TObj>;
    
    const takeSuggestion: Suggestion = "baz.c.ca";
    const bespoke: Suggestion = "bespoke";

    type cases = [
      Expect<DoesExtend<"foo", TObj>>,
      Expect<DoesExtend<`bar.${number}`, TObj>>,
      Expect<DoesExtend<"baz.c.ca", TObj>>,
      // aware of VueJS ref object
      Expect<DoesExtend<"info.value.age", TObj>>,
      // suggestions are offered but not required
      Expect<DoesExtend<typeof takeSuggestion, Suggestion>>,
      Expect<DoesExtend<typeof bespoke , Suggestion>>,
    ];
    const cases: cases = [ 
      true, true, true, true, 
      true, true
    ];
  });

  it("using an array target", () => {
    type ExampleArr = DotPathFor< ["foo", "bar", "baz"]>;
    type Expected =  "" | "0" | "1" | "2";

    type Suggestion = Suggest<ExampleArr>;


    type cases = [
      Expect<Equal<ExampleArr, Expected>>,
      Expect<Equal<Suggestion, Expected | (string & {})>>, //
    ];
    const cases: cases = [ true,true ];
  });

  it("Container and Scalar values provide empty string offset", () => {
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

    type ScalarPaths = DotPathFor<42>;
    type NullPaths = DotPathFor<null>;
    type ObjPaths = DotPathFor<Obj>;
    
    type cases = [
      Expect<DoesExtend<ScalarPaths, "">>,
      Expect<DoesExtend<NullPaths, "">>,
      Expect<DoesExtend<"", ObjPaths >>,
    ];
    const cases: cases = [ 
      true, true, true, 
    ];
  });

  
  it("Wide object type and scalars resolve to only root path", () => {
    type TObj = DotPathFor<object>;
    type TNum = DotPathFor<42>;
    type TStr = DotPathFor<"foobar">;

    type cases = [
      Expect<Equal<TObj, "">>,
      Expect<Equal<TNum, "">>,
      Expect<Equal<TStr, "">>,
    ];
    const cases: cases = [ true, true, true  ];
  });
  
});


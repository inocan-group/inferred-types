import { Equal, Expect, ExpectExtends } from "@type-challenges/utils";
import { find } from "src/runtime/lists/find";
import { fromKv } from "src/runtime/type-conversion/fromKv";
import { toKv } from "src/runtime/type-conversion/toKv";
import {  ToKV , FromKV } from "src/types/type-conversion";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Convert an object to and from the KV array structure", () => {
  describe("Type Checks", () => {  
    type Obj = { foo: 1; bar: string };
    type KV = readonly [ ["KV", "foo", 1], ["KV", "bar", string ] ];
    type KV_Inverted = readonly [ ["KV", "bar", string ], ["KV", "foo", 1] ];
    type Explicit = readonly ["foo", "bar"];

    it("Obj to KV", () => {
      type AsKv = ToKV<Obj>; // preserves all KV's but order is not guaranteed
      type ExplicitKV = ToKV<Obj, Explicit>;
      
      type cases = [
        Expect<ExpectExtends<KV | KV_Inverted, AsKv>>, 
        Expect<Equal<ExplicitKV, KV>>
      ];
      const cases: cases = [ true, true ];
    });

    
    it("KV to Obj", () => {
      type ObjWithTarget = FromKV<KV, Obj>;
      type ObjWithoutTarget = FromKV<KV>;

      type cases = [
        Expect<Equal<ObjWithTarget, Obj>>, 
        Expect<ExpectExtends<Obj, ObjWithoutTarget>>,
      ];
      const cases: cases = [ true, true ];
    });
    
    it("Identity: Obj -> KV -> Obj", () => {
      type Identity = FromKV<ToKV<Obj>, Obj>;
      
      type cases = [
        Expect<Equal<Identity, Obj>>
      ];
      const cases: cases = [ true ];
    });
  });


  describe("Runtime", () => {
    const Obj = { foo: 1, bar: "howdy" } as const;
    type Example = readonly [ ["KV", "foo", 1], ["KV", "bar", string ] ];
    const kv = [ ["KV", "foo", 1], ["KV", "bar", "howdy" ] ] as Example;

    it("Obj -> KV", () => {
      const t1 = toKv(Obj);
      const finder = find(t1, 1);

      const foo = t1.find(i => i[1] === "foo");
      const foo2 = finder("foo");
      const bar = t1.find(i => i[1] === "bar");
      const bar2 = finder("bar");

      expect(foo).toEqual(["KV", "foo", 1]);
      expect(foo2).toEqual(["KV", "foo", 1]);
      expect(bar).toEqual(["KV", "bar", "howdy"]);
      expect(bar2).toEqual(["KV", "bar", "howdy"]);
    });

    
    it("KV -> Obj", () => {
      const t1 = fromKv(kv);

      expect(t1).toEqual({foo: 1, bar: "howdy"});
      type cases = [
        Expect<Equal<typeof t1, {foo: 1; bar: string}>>, //
      ];
      const cases: cases = [ true ];
    });
  });
  

});

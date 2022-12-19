import { Equal, Expect } from "@type-challenges/utils";
import { NumericType, StringType } from "src/runtime/runtime/type";
import { ObjectFromKv } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ObjectFromKv<KV>", () => {

  it("happy path", () => {
    const kv = [
      { key: "foo", value: "" as unknown as StringType },
      { key: "bar", value: 0 as unknown as NumericType }
    ] as const;

    type Obj = ObjectFromKv<typeof kv>;
    
    type cases = [
      Expect<Equal<Obj, { foo: string; bar: number }>>, //
    ];
    const cases: cases = [ true ];
  });

});
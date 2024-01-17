import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { ifRef } from "src/runtime/index";
import { MaybeRef, VueRef } from "src/types/index";
import { ref } from "vue";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("ifRef(value,if,else)", () => {

  it("happy path", () => {
    const str: MaybeRef<string> = "foobar";
    const str_ref: MaybeRef<string> = ref("foobar");

    const t_str = ifRef(str, v => v["value"], v => v);
    const t_ref = ifRef(str_ref, v => v["value"], v => v );
    const t_def_str = ifRef(str);
    const t_def_ref= ifRef(str_ref);
    
    type cases = [
      Expect<Equal<typeof t_str, string>>,
      Expect<Equal<typeof t_ref, string>>,
      Expect<Equal<typeof t_def_str, string>>,
      Expect<Equal<typeof t_def_ref, string>>,
    ];
    const cases: cases = [
      true, true, true, true
    ];
  });
  
  it("literal string", () => {
    const val = ifRef("foobar");
    const ref_val = ifRef(ref("foobar") as VueRef<"foobar">);
    
    type cases = [
      Expect<Equal<typeof val, "foobar">>,
      Expect<Equal<typeof ref_val, "foobar">>
    ];
    const cases: cases = [ true, true ];
  });
  
});

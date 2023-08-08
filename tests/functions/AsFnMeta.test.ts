import { Equal, Expect } from "@type-challenges/utils";
import { AsFnMeta } from "src/types";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("AsFnMeta<Fn> type utility", () => {

  it("happy path", () => {
    type F1 = () => `hi`;
    type F2 = <T extends string>(name: T) => `Hi ${T}`;
    type F3 = F2 & { foo: "bar"};

    type M1 = AsFnMeta<F1>;
    type M2 = AsFnMeta<F2>;
    type M3 = AsFnMeta<F3>;
    
    type cases = [
      Expect<Equal<M1, { args: []; returns: "hi"; props: "no-props" }>>,
      Expect<Equal<
        M2, 
        { args: [name: string]; returns: `Hi ${string}`; props: "no-props" }
      >>,
      Expect<Equal<
      M3, 
      { args: [name: string]; returns: `Hi ${string}`; props: { foo: "bar"} }
    >>,

    ];
    const cases: cases = [ true, true, true ];
  });
});

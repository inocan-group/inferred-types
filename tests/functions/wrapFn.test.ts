
import { describe,  } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe.skip("wrapFn()", () => {

  // const greet = <T extends string>(name: T) => `Hello ${name}` as const;
  // const best = <T extends string>(str: T) => `${str}; best of luck` as const;

  // it("first test", () => {
  //   const basic = greet("Ken");
  //   const greeting = wrapFn(best)(greet);
  //   const ken = greeting("Ken");
  //   const ken2 = best(greet("Ken"));

  //   expect(greeting("Ken")).toBe("Hello Ken; best of luck");


  //   type cases = [
  //     Expect<Equal<typeof ken, `${string}; best of luck`>>,
  //     Expect<Equal<typeof ken2, `Hello Ken; best of luck`>>
  //   ];
  //   const cases: cases = [
  //     true, true
  //   ];
  // });

});

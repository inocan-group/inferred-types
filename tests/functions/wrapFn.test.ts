
import { describe,  } from "vitest";



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
  //     Expect<Test<typeof ken, "equals",  `${string}; best of luck`>>,
  //     Expect<Test<typeof ken2, "equals",  `Hello Ken; best of luck`>>
  //   ];
  //   const cases: cases = [
  //     true, true
  //   ];
  // });

});

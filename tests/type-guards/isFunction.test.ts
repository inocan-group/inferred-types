import { describe, it, expect} from "vitest";
import { isFunction, createFnWithProps } from "inferred-types/runtime";
import { Expect, Test } from "inferred-types/types";



describe("isFunction(val) type-guard", () => {

  it("happy path", () => {
    const t1 = isFunction(() => "hi");
    const t2 = isFunction(createFnWithProps(() => "bye", { type: "function"}));

    expect(t1).toBe(true);
    expect(t2).toBe(true);

    const fn: ((name: string) => `Hi ${string}`) | undefined = (name: string)  => `Hi ${name}`;
    if(isFunction(fn)) {
      type Fn = typeof fn;

      // @ts-ignore
      type cases = [
        Expect<Test<Fn, "equals",  (name: string) => `Hi ${string}`>>
      ];
    }

  });

});

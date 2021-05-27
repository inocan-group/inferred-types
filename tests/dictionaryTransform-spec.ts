/* eslint-disable unicorn/consistent-function-scoping */
import { dictionaryTransform, ExplicitFunction } from "~/utility";
import type { Expect, Equal, NotEqual, ExpectExtends, ExpectFalse } from "@type-challenges/utils";
import { ToFluent, Transformer } from "~/types";

describe("dictionaryTransform()", () => {
  type A = { foo: string; bar: string };
  const a = { foo: "1", bar: "2" };

  // B typed
  type B = { foo: number; bar: number };
  // B typed as literal
  type BL = { foo: 1; bar: 2 };
  const b = { foo: 1, bar: 2 };
  // B inferred
  type BI = typeof b;

  const createMutationApi = (state: { foo: number }) => {
    const api = {
      increment() {
        state.foo = state.foo++;
      },
      decrement() {
        state.foo = state.foo--;
      },
      set(v: number) {
        state.foo = v;
      },

      getState() {
        return state;
      },
    };

    return api;
  };

  it("simple dictionary with strings converted to numbers", () => {
    const transform: Transformer<A, B> = (i) => {
      return Number(i);
    };

    const t = dictionaryTransform(a, transform);
    type T = typeof t;

    type cases = [
      // wide type of string should now be number
      Expect<Equal<T, B>>,
      Expect<Equal<T, BI>>,
      Expect<ExpectExtends<T, B>>,
      Expect<ExpectExtends<T, BI>>,
      // literals will not be involved here
      Expect<NotEqual<T, BL>>,
      // the literal _does_ extend the wider type
      Expect<ExpectExtends<T, BL>>,
      // but not the reverse
      ExpectFalse<ExpectExtends<BL, T>>
    ];

    const cases: cases = [true, true, true, true, true, true, false];
    expect(cases).toBe(cases);
  });

  it("A mutation function can can be transformed into a fluent API", () => {
    const state = { foo: 0 };
    const api = createMutationApi(state);
    type A = typeof api;
    // the mutation api performs as expected
    // this includes returning the state after any call
    expect(api.increment()).toBe({ foo: 1 });
    expect(api.decrement()).toBe({ foo: -1 });
    // the one exception is getState which just returns the value
    expect(api.getState().foo).toBe(0);

    // transform function
    const transform: Transformer<A, ToFluent<A>> = (fn, k) => {
      switch (k) {
        case "getState":
          return () => {
            return api;
          };
        case "set":
        case "decrement":
        case "increment":
          return (...args: Parameters<typeof fn>) => {
            const f2 = ExplicitFunction(fn);
            f2(...args);
            return api;
          };
      }
    };

    const t = dictionaryTransform(api, transform);
    type T = typeof t;

    // the transformed API is fluent and so calls to the API should return
    // the same API surface
    expect(typeof t.increment().increment).toBe("function");
    expect(typeof t.decrement().increment).toBe("function");
    // this even applies to getState() which no longer has any useful utility
    expect(typeof t.getState().increment).toBe("function");
    // this pattern should continue indefinitely
    expect(typeof t.increment().decrement().increment().decrement).toBe("function");

    // beyond the run-time system, we must check that all types are expected
    type cases = [
      // All functions return the same API defined by T
      Expect<Equal<ReturnType<T["increment"]>, T>>,
      Expect<Equal<ReturnType<T["decrement"]>, T>>,
      Expect<Equal<ReturnType<T["set"]>, T>>,
      Expect<Equal<ReturnType<T["getState"]>, T>>,
      // set() has a distinct set of parameters from other methods
      Expect<NotEqual<Parameters<T["increment"]>, Parameters<T["set"]>>>,
      // whereas the rest on this API are the same
      Expect<Equal<Parameters<T["increment"]>, Parameters<T["decrement"]>>>
    ];
    const cases: cases = [true, true, true, true, true, true];
    expect(cases).toBe(cases);
  });
});

/* eslint-disable unicorn/consistent-function-scoping */
import { dictionaryTransform, ExplicitFunction } from "~/utility";
import { Expect, Equal, NotEqual, ExpectExtends, ExpectFalse } from "@type-challenges/utils";
import { ToFluent, Transformer } from "~/types";

describe("dictionaryTransform()", () => {
  type A = { foo: string; bar: string };
  const a: A = { foo: "1", bar: "2" };
  type F = { foo: () => string; bar: () => string };
  const f: F = { foo: () => "1", bar: () => "2" };
  type F2 = { foo: (n: number) => string; bar: (a: number, b: number) => string };
  // const f2: F2 = { foo: (n: number) => `${n}`, bar: (a: number, b: number) => `${a * b}` };

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
        return { ...state, foo: state.foo + 1 };
      },
      decrement() {
        return { ...state, foo: state.foo - 1 };
      },
      set(v: number) {
        return { ...state, foo: v };
      },

      getState() {
        return state;
      },
    };

    return api;
  };

  type State = { foo: number };
  const state: State = { foo: 0 };

  type MutApi = { inc: () => State; dec: () => State; set: (n: number) => State };
  const mutApi: MutApi = {
    inc() {
      return { ...state, foo: state.foo + 1 };
    },
    dec() {
      return { ...state, foo: state.foo - 1 };
    },
    set(n: number) {
      return { ...state, foo: n };
    },
  };
  type FluentApi = { inc: () => FluentApi; dec: () => FluentApi; set: (n: number) => FluentApi };
  const fluentApi: FluentApi = {
    inc() {
      state.foo = mutApi.inc().foo;
      return fluentApi;
    },
    dec() {
      state.foo = mutApi.dec().foo;
      return fluentApi;
    },
    set(n: number) {
      state.foo = mutApi.set(n).foo;
      return fluentApi;
    },
  };
  type SyntheticFluent = ToFluent<MutApi>;

  it("simple dictionary with strings converted to numbers", () => {
    const transform: Transformer<A, B> = (i, k) => {
      return Number(i[k]);
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

  it("simple function based dictionary <F> converted to numbers <B>", () => {
    const transform: Transformer<F, B> = (i, k) => {
      return Number(i[k]());
    };
    const t = dictionaryTransform(f, transform);
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

  it("function with variant parameters <F2> converted to numbers <B>", () => {
    const transform: Transformer<F2, B> = (i, k) => {
      switch (k) {
        case "foo":
          return Number(i[k](4));
        case "bar":
          return Number(i[k](1, 2));
      }
    };
    const t = dictionaryTransform(f, transform);
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
    expect(api.increment().foo).toBe(1);
    expect(api.decrement().foo).toBe(-1);
    // the one exception is getState which just returns the value
    expect(api.getState().foo).toBe(0);

    // transform function
    const transform: Transformer<A, ToFluent<A>> = (i, k) => {
      switch (k) {
        case "getState":
          return () => {
            return dictionaryTransform(api, transform);
          };
        case "set":
        case "decrement":
        case "increment":
          const fn = ExplicitFunction(i[k]);
          return (...args: Parameters<typeof fn>) => {
            fn(...args);
            // this is cheating as runtime is not updated
            return dictionaryTransform(api, transform);
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

  it("Explicit mutation API and fluent API", () => {
    const transform: Transformer<MutApi, FluentApi> = (i, k) => {
      switch (k) {
        case "dec":
        case "inc":
          return () => {
            i[k](); // mutate state
            return fluentApi;
          };
        case "set":
          return (n: number) => {
            i[k](n); // mutate state
            return fluentApi;
          };
      }
    };

    const t = dictionaryTransform(mutApi, transform);
    type T = typeof t;

    type cases = [
      // the explicit definition of the Fluent API is
      // the same as the synthetic version created with ToFluent
      Expect<Equal<FluentApi, SyntheticFluent>>,
      // the fluent API derived from the dictionary transform is
      // also the same as the explicit and synthetic
      Expect<Equal<FluentApi, T>>
    ];
    const cases: cases = [true, true];
    expect(cases).toBe(cases);
  });

  it("using dictionaryTransform recursively for fluent API works at both runtime and designtime", () => {
    const transform: Transformer<MutApi, FluentApi> = (i, k) => {
      switch (k) {
        case "dec":
        case "inc":
          return () => {
            state.foo = i[k]().foo; // mutate state, assign to global "state"
            return dictionaryTransform(mutApi, transform);
          };
        case "set":
          return (n: number) => {
            state.foo = i[k](n).foo; // mutate state
            return dictionaryTransform(mutApi, transform);
          };
      }
    };

    const t = dictionaryTransform(mutApi, transform);
    type T = typeof t;

    type cases = [
      // the fluent API derived from recursive calls to dictionaryTransform
      // is seen as the same type the explictly deinfined type.
      Expect<Equal<FluentApi, T>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);

    t.set(0);
    expect(state.foo).toBe(0);
    t.set(1);
    expect(state.foo).toBe(1);
    t.set(0).inc().inc();
    expect(state.foo).toBe(2);
  });
});

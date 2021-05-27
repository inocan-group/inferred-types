/* eslint-disable unicorn/consistent-function-scoping */
import { Builder, BuilderApi, TypeGuard } from "../src/Builder";
import { isNonNullObject } from "common-types";
import type { Expect, ExpectExtends, ExpectFalse } from "@type-challenges/utils";

describe("Builder", () => {
  it("Api endpoints can be defined independently but work off same state object", () => {
    type State = { foo: number; bar: number; baz?: string };
    const endpoint = BuilderApi<State>();
    const f1 = endpoint("incFoo", (s) => () => ({
      ...s,
      foo: s.foo ? s.foo++ : 1,
    }));
    const f2 = endpoint("decFoo", (s) => () => ({ ...s, foo: s.foo ? s.foo-- : 0 }));
    const f3 = endpoint("setFoo", (s) => (foo: number) => ({ ...s, foo }));

    const s: Partial<State> = { foo: 0, bar: 0 };
    const inc = f1.incFoo(s);
    const dec = f2.decFoo(s);
    const set = f3.setFoo(s);

    const incremented = inc();
    expect(incremented.foo).toBe(1);
    const decremented = dec();
    expect(decremented.foo).toBe(0);
    expect(set(45).foo).toBe(45);
  });

  it("API endpoints can be composed external to builder but accepted as valid param input to Builder", () => {
    type State = { foo: number; bar: number; baz?: string };
    const endpoint = BuilderApi<State>();
    /** increment the value of Foo */
    const f1 = endpoint("incFoo", (s) => () => ({
      ...s,
      foo: s.foo ? s.foo++ : 1,
    }));
    const f2 = endpoint("decFoo", (s) => () => ({ ...s, foo: s.foo ? s.foo-- : 0 }));

    /**
     * composed dictionary of `MutationIdentity` functions representing an
     *an API _capability_ for the builder
     */
    const composed = { ...f1, ...f2 };

    type BuilderApi = Parameters<typeof Builder>[1];
    type ComposedApi = typeof composed;

    // design-time type validation
    type cases = [Expect<ExpectExtends<BuilderApi, ComposedApi>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("when initial state is NOT complete, completing state leads to unwrap() being exposed", () => {
    type State = { foo: number; bar: number; baz?: string };
    const endpoint = BuilderApi<State>();
    /** increment the value of Foo */
    const f1 = endpoint("incFoo", (s) => () => ({
      ...s,
      foo: s.foo ? s.foo++ : 1,
    }));
    const f2 = endpoint("decFoo", (s) => () => ({ ...s, foo: s.foo ? s.foo-- : 0 }));
    const f3 = endpoint("incBar", (s) => () => ({
      ...s,
      bar: s.bar ? s.bar++ : 1,
    }));
    const composed = { ...f1, ...f2, ...f3 };
    const tg: TypeGuard<State> = (input: unknown): input is State => {
      return (
        isNonNullObject(input) &&
        typeof (input as State).foo === "number" &&
        typeof (input as State).bar === "number"
      );
    };
    const builder = Builder(tg, composed)({ foo: 1 });

    const t1 = builder.decFoo().decFoo().decFoo().decFoo().decFoo().incFoo();
    const t2 = builder.incBar().incBar().incFoo();
    console.log({ t1, t2 });
  });

  it("when initial state IS complete, unwrap() is available to start but reducing state to an incomplete state removes the unwrap() part of API", () => {
    type State = { foo: number; bar: number; baz?: string };
    const endpoint = BuilderApi<State>();
    /** increment the value of Foo */
    const f1 = endpoint("incFoo", (s) => () => ({
      ...s,
      foo: s.foo ? s.foo++ : 1,
    }));
    const f2 = endpoint("decFoo", (s) => () => ({ ...s, foo: s.foo ? s.foo-- : 0 }));
    const f3 = endpoint("incBar", (s) => () => ({
      ...s,
      bar: s.bar ? s.bar++ : 1,
    }));
    const f4 = endpoint("clear", () => () => ({}));
    const composed = { ...f1, ...f2, ...f3, ...f4 };
    const tg: TypeGuard<State> = (input: unknown): input is State => {
      return (
        isNonNullObject(input) &&
        typeof (input as State).foo === "number" &&
        typeof (input as State).bar === "number"
      );
    };
    const builder = Builder(tg, composed)({ foo: 1, bar: 0 });

    const t1 = builder.decFoo().decFoo().decFoo().decFoo().decFoo().incFoo();
    const t2 = builder.clear();
    console.log({ t1, t2 });
  });

  it("Type extends Partial of itself", () => {
    type State = { foo: number; bar: number };
    type State2 = { foo: number; bar: number };
    type PState = Partial<State>;

    const ident = <T extends PState>(s: T): T => s;

    const ex1 = ident({ foo: 1 });
    const ex2 = ident({ foo: 1, bar: 1 });

    type cases = [
      // value extends partial but no full state
      Expect<ExpectExtends<PState, typeof ex1>>,
      ExpectFalse<ExpectExtends<State, typeof ex1>>,
      // value extends both partial and full state
      Expect<ExpectExtends<PState, typeof ex2>>,
      Expect<ExpectExtends<State, typeof ex2>>,
      // State extends PState
      Expect<ExpectExtends<PState, State>>,
      ExpectFalse<ExpectExtends<State, PState>>,

      // Two identical states extend one another
      Expect<ExpectExtends<State, State2>>,
      Expect<ExpectExtends<State2, State>>
    ];

    const cases: cases = [true, false, true, true, true, false, true, true];
  });
  it.todo("Type extends true", () => {
    const foo = true;
    type Foo = typeof foo;
    type cases = [Expect<ExpectExtends<true, Foo>>];
    const cases: cases = [true];
  });
  it.todo("");
  it.todo("");
});

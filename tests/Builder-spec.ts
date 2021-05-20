/* eslint-disable unicorn/consistent-function-scoping */
import { Builder, BuilderApi, TypeGuard } from "../src/Builder";
import { isNonNullObject } from "common-types";
import type { Expect, ExpectExtends } from "@type-challenges/utils";

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
    const tg: TypeGuard<State> = (input: unknown): input is State => {
      return (
        isNonNullObject(input) &&
        typeof (input as State).foo === "number" &&
        typeof (input as State).bar === "number"
      );
    };

    /**
     * composed dictionary of `MutationIdentity` functions representing an
     *an API _capability_ for the builder
     */
    const composed = { ...f1, ...f2 };
    // runtime validate that "composed" can be passed into builder
    const b = Builder(tg, composed, { foo: 1, bar: 2 });
    const c = b.incFoo().decFoo();
    console.log("builder", b.decFoo(), (c as any).unwrap());

    type BuilderApi = Parameters<typeof Builder>[1];
    type ComposedApi = typeof composed;

    // design-time type validation
    type cases = [Expect<ExpectExtends<BuilderApi, ComposedApi>>];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("proxy text", () => {
    const api = {
      sayHi() {
        return "hi";
      },
    };

    const proxy = new Proxy(api.sayHi, {
      apply: (t, _thisArgs, _args) => {
        return t().toUpperCase() + " there";
      },
    });

    console.log(api.sayHi(), proxy());
  });
  it.todo("");
  it.todo("");
  it.todo("");
});

import type { Expect, Equal, ExpectExtends } from "@type-challenges/utils";
import { Keys, ToFluent } from "~/types";
import { BuilderState } from "./data";

const api = {
  foo: () => 5,
  bar: () => "hi",
  baz: (greeting: string) => greeting,
};
type Api = typeof api;
type Fluent = ToFluent<Api>;

describe("ToFluent<T,X> type utility", () => {
  it("a simple function-based API has it's return types changed to point back to API", () => {
    type cases = [
      // all return types on the API return the same Fluent API
      Expect<Equal<Fluent, ReturnType<Fluent["foo"]>>>,
      Expect<Equal<Fluent, ReturnType<Fluent["bar"]>>>,
      Expect<Equal<Fluent, ReturnType<Fluent["baz"]>>>,
      // this is also true recursively
      Expect<Equal<Fluent, ReturnType<ReturnType<Fluent["foo"]>["bar"]>>>
    ];
    const cases: cases = [true, true, true, true];
    expect(cases).toBe(cases);
  });

  // this allows for non fluent parts of the API to be continued on too as part of fluent
  // process.
  it("an API <T> can be made fluent but while including the type <X> as part of the return type", () => {
    const x = {
      hi: () => "hello",
    };
    type X = typeof x;
    type FluentX = ToFluent<Api, X>;

    type cases = [
      // all return types on the API return the same Fluent API
      Expect<Equal<FluentX, ReturnType<FluentX["foo"]>>>,
      Expect<Equal<FluentX, ReturnType<FluentX["bar"]>>>,
      Expect<Equal<FluentX, ReturnType<FluentX["baz"]>>>,
      // this is also true recursively
      Expect<Equal<FluentX, ReturnType<ReturnType<FluentX["foo"]>["bar"]>>>,
      // the non-fluent API also shows up
      Expect<ExpectExtends<Keys<FluentX>, "hi">>,
      // the "hi" function returns a string (and breaks out of the fluent loop)
      Expect<Equal<string, ReturnType<FluentX["hi"]>>>
    ];
    const cases: cases = [true, true, true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("using API structures similar to a builder", () => {
    const identityApi = {
      incFoo: <T extends Partial<BuilderState>, T2 extends Partial<BuilderState>>(s: T) => () => ({ ...s, foo: s.foo ? s.foo : 1 } as T2),
      decBar: <T extends Partial<BuilderState>>(s: T) => () => ({ ...s, foo: s.foo ? s.foo : 1 } as T),
    };
    const escapeApi = {};
    type Escape<T extends object = {}> = { unwrap: () => BuilderState; current: Partial<BuilderState> } & T;
  });
});

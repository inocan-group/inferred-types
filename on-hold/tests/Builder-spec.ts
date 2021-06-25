/* eslint-disable unicorn/consistent-function-scoping */
import { Builder, BuilderApi, BuilderComplete } from "../Builder";
import { isNonNullObject } from "common-types";
import { Expect, ExpectExtends, ExpectFalse, Equal } from "@type-challenges/utils";
import { FluentApi, Keys, ToFluent, TypeGuard } from "~/types";
import { createBuilder, BuilderState } from "../../tests/data";

describe("Builder", () => {
  it("BuilderComplete utilty can detect when builder is complete", () => {
    type A = { foo: string };
    type B = { foo: string; bar: number };
    type T = BuilderComplete<A, B>;

    type State = { foo: number; bar: number };
    const s = { foo: 43, bar: 12 };
    type S = typeof s;
    type Done = BuilderComplete<S, State>;

    const n = { foo: 4 };
    type N = typeof n;
    type NotDone = BuilderComplete<N, State>;

    const p: Partial<State> = { foo: 4 }; // not done
    type P = BuilderComplete<typeof p, State>;
    const p2: Partial<State> = { foo: 4, bar: 12 }; // done
    type P2 = BuilderComplete<typeof p2, State>;
    const p3: Partial<State> | State = { foo: 4, bar: 12 }; // done (but masked)
    type P3 = BuilderComplete<typeof p3, State>;

    const identity = <T extends Partial<State>>(s: T) => s;
    const pf = identity({ foo: 4, bar: 12 }); // done
    type PF = BuilderComplete<typeof pf, State>;
    const pf2 = identity(p3); // done (but masked)
    type PF2 = BuilderComplete<typeof pf2, State>;

    const i2 = <I extends Partial<State>>(i: I, tg: TypeGuard<State>) => {
      return tg(i) ? (i as State) : i;
    };
    const typeGuard: TypeGuard<State> = (i: unknown): i is State => {
      return isNonNullObject(i) && (i as any).foo !== undefined && (i as any).bar !== undefined;
    };
    const pf3 = i2(p2, typeGuard);
    type PF3 = BuilderComplete<typeof pf3, State>;

    const tgrDone = typeGuard(p3);
    const tgrNotDone = typeGuard(p);
    type Complete<T> = T extends true ? "" : "unwrap";
    type TgDone = Complete<typeof tgrDone>;
    type TgNotDone = Complete<typeof tgrNotDone>;

    type cases = [
      // simple type comparison of A to B
      Expect<Equal<T, "unwrap">>,
      // When using _typeof_ for types the Done/NotDone
      // shows clear switching between the two states
      Expect<Equal<Done, "">>,
      Expect<Equal<NotDone, "unwrap">>,
      // when a type is expressed as a Partial<T> we seem
      // to lose the ability to identify the completed state
      Expect<Equal<P, "unwrap">>,
      // this really IS complete (so should eval to true)
      ExpectFalse<Equal<P2, "">>,
      // unfortunately changing Partial<T> to a union of
      // Parial<T> | T does not address this but instead
      // just changes the result to a union as well
      Expect<Equal<P3, "" | "unwrap">>,
      // To get around this limitation, we can try a simple
      // identity function. Niavely this works when you call
      // it with a runtime object with no explicit typing
      Expect<Equal<PF, "">>,
      // But sadly, when you pass in a type which has already
      // been set as a Partial, it still fails in the same way
      Expect<Equal<PF2, "" | "unwrap">>,
      // More surprisingly, an identity function which is given
      // a type guard to detect whether the type is T or Partial<T>
      // still returns a union
      Expect<Equal<PF3, "" | "unwrap">>,
      // Surely not all is lost though, as the Type Guard is a binary switch
      // for the type system, trying to tie directly into this though
      // we get the same union results
      Expect<Equal<TgDone, "" | "unwrap">>,
      Expect<Equal<TgNotDone, "" | "unwrap">>
    ];
    const cases: cases = [true, true, true, true, false, true, false];
  });

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

  it("fluent API fully exposed to type system and ReturnType validates fluent API", () => {
    const initialState = { foo: 1, bar: 2 };
    const builder = createBuilder(initialState);
    type Escape<T extends object = {}> = { unwrap: () => BuilderState; current: Partial<BuilderState> } & T;
    type ExplicitType = FluentApi<ToFluent<typeof initialState, Escape>, Escape, "" | "test">;
    type B = typeof builder;
    type RT = ReturnType<B["incFoo"]>;

    type cases = [
      Expect<ExpectExtends<Keys<B>, "incFoo">>,
      Expect<ExpectExtends<Keys<B>, "decFoo">>,
      Expect<ExpectExtends<Keys<B>, "setFoo">>,
      Expect<ExpectExtends<Keys<B>, "incBar">>,
      Expect<ExpectExtends<Keys<B>, "setBar">>,
      Expect<ExpectExtends<Keys<B>, "setBaz">>,
      // and since config is "complete" unwrap is exposed too
      Expect<ExpectExtends<Keys<B>, "unwrap">>,
      // Endpoints return the same fluent API
      Expect<Equal<B, RT>>
    ];
    const cases: cases = [true, true, true, true, true, true, true, true];
    expect(cases).toBe(cases);
  });

  it("simple omit test", () => {
    const omit = <T extends object, K extends keyof T>(dict: T, key: K) => {
      return dict as Omit<T, K>;
    };
    const obj = { foo: 1, bar: 2 };
    const obj2 = omit(obj, "bar");
    type O2 = typeof obj2;


    type Start = { foo: number, bar: number };
    const obj3: Start = { foo: 1, bar: 2 };
    const obj4 = omit(obj3, "bar");
    type O4 = typeof obj4;
  });

  it.skip("fluent API can be partially masked with exclusions", () => {
    const builder = createBuilder({ foo: 1 });
    type B = typeof builder;
    type RT = ReturnType<B["incFoo"]>;

    type cases = [
      Expect<ExpectExtends<Keys<B>, "incFoo">>,
      Expect<ExpectExtends<Keys<B>, "decFoo">>,
      Expect<ExpectExtends<Keys<B>, "setFoo">>,
      Expect<ExpectExtends<Keys<B>, "incBar">>,
      Expect<ExpectExtends<Keys<B>, "setBar">>,
      Expect<ExpectExtends<Keys<B>, "setBaz">>,
      // and since config is not complete, unwrap is hidden
      ExpectFalse<ExpectExtends<Keys<B>, "unwrap">>,
      // Endpoints return the same fluent API
      Expect<Equal<B, RT>>
    ];
    const cases: cases = [true, true, true, true, true, true, false, true];
    expect(cases).toBe(cases);
  });

  it("unwrap() is available when initial state is 'done'", () => {
    const builder = createBuilder({ foo: 1, bar: 2 });
    type B = typeof builder;

    type cases = [
      // unwrap is available on API surface
      Expect<ExpectExtends<Keys<B>, "unwrap">>,
      // unwrap is a function
      Expect<ExpectExtends<Function, B["unwrap"]>>,
      // unwrap returns BuilderState
      Expect<Equal<ReturnType<B["unwrap"]>, BuilderState>>
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);

    const result = builder.unwrap();
    expect(result.foo).toBe(1);
    expect(result.bar).toBe(2);
  });

  it("unwrap() is masked when initial state is not 'done'", () => {
    const builder = createBuilder({ foo: 1 });
    type B = typeof builder;

    // bar is required but currently undefined
    expect(builder.current.bar).toBe(undefined);

    type cases = [
      // unwrap is not available on API surface
      ExpectFalse<ExpectExtends<Keys<B>, "unwrap">>
    ];
    const cases: cases = [false];
    expect(cases).toBe(cases);

    // even though type system can't see it, run time still has
    // the unwrap() function but it should return an error
    try {
      (builder as any).unwrap();
      throw new Error("incomplete builder should throw error when unwrapped");
    } catch {
      expect(true).toBe(true);
    }
  });

  it("when initial state is NOT complete, completing state leads to unwrap() being exposed", () => {
    const builder = createBuilder({ foo: 1 });
    const notDone = builder.decFoo().decFoo().decFoo().decFoo().decFoo().incFoo();
    const done = builder.incBar().incBar().incFoo();

    type cases = [
      // a builder which is _not_ done should have unwrap() hidden
      Expect<ExpectExtends<Keys<typeof notDone>, "unwrap">>,
      // in contrast, the builder which is done _should_ have unwrap() available
      Expect<ExpectExtends<Keys<typeof done>, "">>
    ];
    const cases: cases = [false, true];
    expect(cases).toBe(cases);
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
});

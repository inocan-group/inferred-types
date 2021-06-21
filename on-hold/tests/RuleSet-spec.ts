
import { RuleSet } from "~/utility";
type State = { foo: number; bar: number; baz: { a: number; b: number } };
const rules1 = { foo: true, bar: true, yup: () => true, nope: () => false, maybe: (s: State) => s.foo > 5 } as const;
import { Equal, Expect } from "@type-challenges/utils";


describe("RuleSet", () => {

  it("stages of application produce correct signatures", () => {
    const s1 = RuleSet<State>();
    type S1 = typeof s1;
    const s2 = s1(rules1);
    const sl2 = s1({ foo: true, bar: true, yup: () => true, nope: () => false, maybe: (s: State) => s.foo > 5 });
    type S2 = typeof s2;
    type SL2 = typeof sl2;
    const s3 = s2({ foo: 8, bar: 0, baz: { a: 1, b: 2 } });
    type S3 = typeof s3;


    type cases = [
      // the types returned by the 2nd function call should
      // always be narrow in type definition, even if not explicitly
      // stated as as `as const`.
      // critically we we want to distinguish "true" from "false"
      Expect<Equal<S2, SL2>>,
      // at the end we need to arrive at a type which is a string
      // literal representing the key values which have passed the
      // rules.
    ];

  });

  it("dynamic rules are evaluated correctly", () => {
    const noState = RuleSet<State>()(rules1)();
    type NoState = typeof noState;
    const maybePassing = RuleSet<State>()(rules1)({ foo: 8, bar: 0, baz: { a: 1, b: 2 } });
    type Pass = typeof maybePassing;
    const maybeFailing = RuleSet<State>()(rules1)({ foo: 0, bar: 0, baz: { a: 1, b: 2 } });
    type Fail = typeof maybeFailing;

    type cases = [
      // if no state is passed then only static rules are passed forward
      Expect<Equal<NoState, "foo" | "bar">>,
      // "foo" is greater than 5 so results in "maybe" being truthy
      Expect<Equal<Pass, "foo" | "bar" | "yup" | "maybe">>,
      // "foo" is less than 5 and therefore "maybe" is falsy
      Expect<Equal<Fail, "foo" | "bar" | "yup">>,
    ];
    const cases: cases = [true, true, true];
    expect(cases).toBe(cases);
  });

  it("static rulesets operate to exclude parts of an api", () => {
    // const rules1 = RuleSet()({ foo: true })();
    // const rules2 = RuleSet()({ foo: true, baz: true })();

  });
});
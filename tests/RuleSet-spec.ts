import { KeysWithValue } from "~/types";
import { RuleSet } from "~/utility";
type State = { foo: number; bar: number; baz: { a: number; b: number } };
const rules1 = { foo: true, bar: true, baz: () => true, notBaz: () => false } as const;


describe("RuleSet", () => {

  it("stages of application produce correct signatures", () => {
    const s1 = RuleSet<State>();
    const s2 = s1(rules1);
    const s3 = s2();

    type TrueProps = KeysWithValue<true, typeof s3["ruleset"]>;
    type TP = typeof s3["type"];


  });

  it("static rulesets operate to exclude parts of an api", () => {
    // const rules1 = RuleSet()({ foo: true })();
    // const rules2 = RuleSet()({ foo: true, baz: true })();

  });
});
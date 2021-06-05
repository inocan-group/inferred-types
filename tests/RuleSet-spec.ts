import { RuleSet } from "~/utility";
type State = { foo: number; bar: number; baz: { a: number; b: number } };
const rules1: RuleSet = { foo: true, bar: true };


describe("RuleSet", () => {

  it("stages of application produce correct signatures", () => {
    const s1 = RuleSet<State>();
    console.log(s1);
    const s2 = RuleSet<State>()(rules1);
    console.log(s2);
    const s3 = s2();


  });

  it("static rulesets operate to exclude parts of an api", () => {
    // const rules1 = RuleSet()({ foo: true })();
    // const rules2 = RuleSet()({ foo: true, baz: true })();

  });
});
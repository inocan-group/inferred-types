import { Equal, Expect } from "@type-challenges/utils";
import { ruleSet } from "~/utility";

describe("ruleset utility", () => {

  it("static rule is typed correctly", () => {
    const rs = ruleSet()({ id: true, color: false });
    type RS = typeof rs;

    expect(rs.id).toBe(true);
    expect(rs.color).toBe(false);

    type cases = [
      Expect<Equal<RS, { id: true; color: false }>>
    ];
    const cases: cases = [true];
    expect(cases).toBe(cases);
  });

  it("dynamic rules interface allows addition of responsive state", () => {
    type State = { foo: number; bar: string; baz: true | false };
    const rs = ruleSet(
      d => d.state<State>().rules({
        maybe: s => s.extends({}),
        probably: s => s.extends({})
      })
    )(
      { id: true, color: false }
    );
    type RS = typeof rs;
  });

});
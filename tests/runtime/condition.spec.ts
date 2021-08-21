import { condition, isFunction, isTrue } from "~/utility";

describe("condition() utility", () => {
  it("basic type checks through condition abstraction", () => {
    const trueIsTrue = condition(isTrue, true);
    const falseAintTrue = condition(isTrue, false);
    const simpleFnIsAFunction = condition(isFunction, () => "hello world");

    // run time
    expect(trueIsTrue).toBe(true);
    expect(falseAintTrue).toBe(false);
    expect(simpleFnIsAFunction).toBe(true);

    // typing

    //TODO: get this working!
  });
});

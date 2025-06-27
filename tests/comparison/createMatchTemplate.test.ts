// import { createMatchTemplate } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe.skip("createMatchTemplate()", () => {

  it("solo template", () => {
    const solo = createMatchTemplate(`Name: {{string}}`);
    const template = solo.template;

    expect(template).toEqual(`Name: {{string}}`)

    const testTrue = solo.test(`Name: Bob`);
    const execTrue = solo.match(`Name: Bob`);

    expect(execTrue).toEqual(["Name: Bob", "Bob"])
    expect(testTrue).toBe(true);

    type cases = [
      /** type tests */
    ];
  });


  it("multi template", () => {
    const multi = createMatchTemplate({
        string: `String({{string}})`,
        number: `Number({{number}})`
    })

    type cases = [
      /** type tests */
    ];
  });


});

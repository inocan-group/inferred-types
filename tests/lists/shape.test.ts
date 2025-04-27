import { isShape, shape } from "inferred-types/runtime";
import { Expect, Ip4Address, Test, ZipCode } from "inferred-types/types";
import { describe, expect, it } from "vitest";



describe("shape(s => s.[api])", () => {

  it("strings", () => {
    const str = shape(s => s.string());
    const strLit = shape(s => s.string("foo"));
    const strUnion = shape(s => s.string("foo", "bar"));
    const ipAddress = shape(s => s.string().ipv4Address());
    const zip = shape(s => s.string().zipCode());

    expect(str).toEqual("<<string>>");
    expect(strLit).toEqual("<<string::foo>>");
    expect(strUnion).toEqual("<<union::<<string::foo>>,<<string::bar>>>>");
    expect(ipAddress).toEqual("<<string-set::ipv4Address>>");
    expect(zip).toEqual("<<string-set::ZipCode>>");

    expect(isShape(str)).toBe(true);
    expect(isShape(zip)).toBe(true);

    type cases = [
      Expect<Test<typeof str, "equals",  string>>,
      Expect<Test<typeof strLit, "equals",  "foo">>,
      Expect<Test<typeof strUnion, "equals",  "foo" | "bar">>,
      Expect<Test<typeof ipAddress, "equals",  Ip4Address>>,
      Expect<Test<typeof zip, "equals",  ZipCode>>
    ];

  });


  it.skip("regex backed", () => {
    // should create a string literal type which has a backing regex for validation
    const zip = shape(s => s.string().regex(
      /[0-9]{5}(-[0-9]{4}){0,1}/,
      "number", "opt(-)", "opt(number)"
    ))
  })

});

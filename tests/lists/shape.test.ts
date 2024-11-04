import { Equal, Expect } from "@type-challenges/utils";
import { isShape, shape } from "src/runtime/index";
import { Ip4Address, ZipCode } from "@inferred-types/types";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("shape(s => s.[api])", () => {

  it("strings", () => {
    const str = shape(s => s.string());
    const strLit = shape(s => s.string("foo"));
    const strUnion = shape(s => s.string("foo","bar"));
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
      Expect<Equal<typeof str, string>>,
      Expect<Equal<typeof strLit, "foo">>,
      Expect<Equal<typeof strUnion, "foo" | "bar">>,
      Expect<Equal<typeof ipAddress, Ip4Address>>,
      Expect<Equal<typeof zip, ZipCode>>
    ];

    const cases: cases = [
      true, true, true, true, true
    ];
  });


  it.skip("regex backed", () => {
    // should create a string literal type which has a backing regex for validation
    const zip = shape(s => s.string().regex(
      /[0-9]{5}(-[0-9]{4}){0,1}/,
      "number","opt(-)", "opt(number)"
    ))
  })

});

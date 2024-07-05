import { describe, expect, it } from "vitest";
import { SimpleToken } from "../../src/inferred-types";
import { isSimpleTokenTuple } from "../../src/runtime/type-guards/tokens";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isSimpleTokenTuple(val)", () => {
  const t = <T extends SimpleToken>(token: T) => token;

  it("happy path", () => {

    const t1 = [t("string"), t("number")];
    const t2 = [t("string"), t("number"), t("Dict"), t("Map")];

    const f1 = [...t2, "oops"]
    const f2 = [42, 45]

    expect(isSimpleTokenTuple(t1)).toBe(true);
    expect(isSimpleTokenTuple(t2)).toBe(true);

    expect(isSimpleTokenTuple(f1)).toBe(false);
    expect(isSimpleTokenTuple(f2)).toBe(false);
    expect(isSimpleTokenTuple([])).toBe(false);
  });


  it("with dynamic variables", () => {

    const t1 = [ t("Dict<{id: number}>"), "string", "number" ];
    const t2 = [ t("Dict<{foo: number}>"), "string", "number" ];
    const t3 = [ t("Dict<{id: string}>"), "string", t("Dict") ];
    const t4 = [ t("Dict<{foo: string}>"), "string", t("Dict") ];

    expect(isSimpleTokenTuple(t1)).toBe(true);
    expect(isSimpleTokenTuple(t2)).toBe(true);
    expect(isSimpleTokenTuple(t3)).toBe(true);
    expect(isSimpleTokenTuple(t4)).toBe(true);

    const f1 = [ "Dict with numeric id()", "string", "number" ];
    const f2 = [ "Dict with numeric id(foo)", "string", "number" ];

    expect(isSimpleTokenTuple(f1)).toBe(false);
    expect(isSimpleTokenTuple(f2)).toBe(false);
  });


});

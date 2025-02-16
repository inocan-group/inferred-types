import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { isUri } from "inferred-types/runtime";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isUri(val) type guard", () => {

  it("happy path", () => {
    const http = "http://foo.bar/baz" as string;
    const ftp = "ftp://foo.bar:87887" as string;
    const ssh = "ssh://foo.bar" as string;

    expect(isUri(http)).toBe(true);
    expect(isUri(ftp)).toBe(true);
    expect(isUri(ssh)).toBe(true);

    expect(isUri(http, "https", "ftp")).toBe(false);

    if (isUri(http, "http", "https")) {


      type cases = [
        Expect<Equal<typeof http, `http://${string}` | `https://${string}`>>
      ];
      const cases: cases = [
        true
      ];
    } else {
      throw new Error(`type guard failed to recognize HTTP protocol`)
    }

  });

});

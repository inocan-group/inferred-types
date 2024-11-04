import { } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import { isSocialMediaUrl } from "../../app/runtime/src/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isSocialMediaUrl", () => {

  it("happy path", () => {
    const t1 = isSocialMediaUrl("https://discord.com?testing");
    const t2 = isSocialMediaUrl("https://www.facebook.com");
    const t3 = isSocialMediaUrl("https://www.instagram.com/foo/bar");

    const f1 = isSocialMediaUrl("https://cnn.com");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);

    expect(f1).toBe(false);

  });

});

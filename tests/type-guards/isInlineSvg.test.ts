import { Equal, Expect } from "@type-challenges/utils";
import { isInlineSvg } from "src/runtime/index";
import { describe, expect, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isInlineSvg(val)", () => {

  it("happy path", () => {
    const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" width="32"….587 1.413Q18.825 22 18 22Zm7-13h5l-5-5Z"/></svg>` as string;
    const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M13.26 10.5h2v1h-2z"/><path fill="#888888" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8.4 15L8 13.77H6.06L5.62 15H4l2.2-6h1.62L10 15Zm8.36-3.5a1.47 1.47 0 0 1-1.5 1.5h-2v2h-1.5V9h3.5a1.47 1.47 0 0 1 1.5 1.5ZM20 15h-1.5V9H20Z"/><path fill="#888888" d="M6.43 12.77h1.16l-.58-1.59z"/></svg>`
    const svg3 = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M13.26 10.5h2v1h-2z"/><path fill="#888888" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8.4 15L8 13.77H6.06L5.62 15H4l2.2-6h1.62L10 15Zm8.36-3.5a1.47 1.47 0 0 1-1.5 1.5h-2v2h-1.5V9h3.5a1.47 1.47 0 0 1 1.5 1.5ZM20 15h-1.5V9H20Z"/><path fill="#888888" d="M6.43 12.77h1.16l-.58-1.59z"/></svg>';
    const svg4 = "<svg xmlns=\"http://www.w3.org/2000/sv\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\"><path fill=\"#888888\" d=\"M13.26 10.5h2v1h-2z\"/><path fill=\"#888888\" d=\"M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8.4 15L8 13.77H6.06L5.62 15H4l2.2-6h1.62L10 15Zm8.36-3.5a1.47 1.47 0 0 1-1.5 1.5h-2v2h-1.5V9h3.5a1.47 1.47 0 0 1 1.5 1.5ZM20 15h-1.5V9H20Z\"/><path fill=\"#888888\" d=\"M6.43 12.77h1.16l-.58-1.59z\"/></svg>";


    const t1 = isInlineSvg(svg1);
    const t2 = isInlineSvg(svg2);
    const t3 = isInlineSvg(svg3);
    const t4 = isInlineSvg(svg4);

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);

    if(isInlineSvg(svg1)) {
      type T = typeof svg1;

      // @ts-ignore
      type cases = [
        Expect<Equal<T, `<svg${string}</svg>`>>,
      ];
    }

  });

});

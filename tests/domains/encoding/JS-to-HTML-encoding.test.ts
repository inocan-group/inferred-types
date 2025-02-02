import { Equal, Expect } from "@type-challenges/utils";
import { decodeHtmlStringToJs, encodeJsStringToHtml } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";


describe("Encoding JS to HTML string and back", () => {

  it("happy path", () => {
    const jsStr = `Everyone knows that 5 > 4, but if they don't I've copyrighted it here → © 2025`;
    const asHtml = encodeJsStringToHtml(jsStr);
    const fromHtml = decodeHtmlStringToJs(`Everyone knows that 5 &gt; 4, but if they don&#39;t I&#39;ve copyrighted it here &rarr; &copy; 2025`)
    const back = decodeHtmlStringToJs(asHtml);


    expect(asHtml).toBe("Everyone knows that 5 &gt; 4, but if they don&#39;t I&#39;ve copyrighted it here &rarr; &copy; 2025")
    expect(fromHtml).toEqual(jsStr);
    expect(back).toEqual(jsStr);

    type cases = [
      Expect<Equal<
        typeof asHtml,
        `Everyone knows that 5 &gt; 4, but if they don&#39;t I&#39;ve copyrighted it here &rarr; &copy; 2025`
      >>,
      Expect<Equal<typeof fromHtml, typeof jsStr>>,
      Expect<Equal<typeof back, typeof jsStr>>
    ];
  });

});

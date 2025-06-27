import { } from "@type-challenges/utils";
import { hasHtml, hasValidHtml, isHtml, isHtmlComponentTag, isValidHtml, isValidHtmlTag } from "inferred-types/runtime";
import { describe, expect, it } from "vitest";

describe("isHtml", () => {

  it("happy path", () => {
    const t1 = isHtml("<span>hi</span>");
    const t2 = isHtml("   <span>hi</span>   ");
    const t3 = isHtml("<html><span>hi</span></html>");


    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);

    const f1 = isHtml("<span>hi");
    const f2 = isHtml("<span>hi</ban>");
    const f3 = isHtml("<span>hi<div>bye</div>");

    expect(f1).toBe(false);
    expect(f2).toBe(false);
    expect(f3).toBe(false);
  });

});

describe("isValidHtml()", () => {

  it("span block", () => {
    const t1 = isValidHtml("<span>hi</span>");
    expect(t1).toBe(true);
  });

  it("span block with whitespace", () => {
    const t1 = isValidHtml("   <span>hi</span>   ");
    expect(t1).toBe(true);
  });

  it("nested tags", () => {
    const t1 = isValidHtml("<html><span>hi</span></html>");
    expect(t1).toBe(true);
  });

  it("trailing non-html", () => {
    const t1 = isValidHtml("<span>hi</span> trailing text");
    expect(t1).toBe(false);
  });

  it("leading non-html", () => {
    const t1 = isValidHtml("leading text <span>hi</span>");
    expect(t1).toBe(false);
  });

  it("leading and trailing non-html", () => {
    const t1 = isValidHtml("leading text <span>hi</span> trailing text");
    expect(t1).toBe(false);
  });

  it("balanced but invalid tags", () => {
    const f1 = isValidHtml("<spam>hi</spam>");
    expect(f1).toBe(false);
  });

  it("no html", () => {
    const f1 = isValidHtml(" hi. 5<6 right? ");
    expect(f1).toBe(false);
  });

  it("imbalanced", () => {
    const f1 = isValidHtml("<span>hi");
    expect(f1).toBe(false);
  });

  it("imbalanced nested", () => {
    const f1 = isValidHtml("<div><span>hi</div>");
    expect(f1).toBe(false);
  });

  it("deeply nested valid HTML", () => {
    const t1 = isValidHtml("<div><span><strong>Text</strong></span></div>");
    expect(t1).toBe(true);
  });

  it("deeply nested invalid HTML", () => {
    const f1 = isValidHtml("<div><span><strong>Text</span></div>");
    expect(f1).toBe(false);
  });

  it("only atomic tag", () => {
    const f1 = isValidHtml("<img src='test.jpg' />");
    expect(f1).toBe(false); // Atomic tags can't be root-level valid HTML
  });

  it("atomic tag nested in block tag", () => {
    const t1 = isValidHtml("<div><img src='test.jpg' /></div>");
    expect(t1).toBe(true);
  });

});

describe("hasHtml()", () => {

  it("happy path", () => {
    const t1 = hasHtml("<span>hi</span>");
    const t2 = hasHtml("   <span>hi</span>   ");
    const t3 = hasHtml("<html><span>hi</span></html>");
    const t4 = hasHtml("leading text<span>hi</span>");
    const t5 = hasHtml("<span>hi</span> trailing text");
    const t6 = hasHtml("<span>hi");

    expect(t1).toBe(true);
    expect(t2).toBe(true);
    expect(t3).toBe(true);
    expect(t4).toBe(true);
    expect(t5).toBe(true);
    expect(t6).toBe(true);

    const f1 = hasHtml("hey ho");
    const f2 = hasHtml("6<5");

    expect(f1).toBe(false);
    expect(f2).toBe(false);
  });

});

describe("hasValidHtml()", () => {



  it("span block", () => {
    const t1 = hasValidHtml("<span>hi</span>");

    expect(t1).toBe(true);
  });

  it("span block with whitespace", () => {
    const t1 = hasValidHtml("   <span>hi</span>   ");
    expect(t1).toBe(true);
  });

  it("nested tags", () => {
    const t1 = hasValidHtml("<html><span>hi</span></html>");
    expect(t1).toBe(true);
  });

  it("trailing non-html", () => {
    const t1 = hasValidHtml("<span>hi</span> trailing text");
    expect(t1).toBe(true);
  });

  it("leading non-html", () => {
    const t1 = hasValidHtml("leading text <span>hi</span>");
    expect(t1).toBe(true);
  });

  it("leading and trailing non-html", () => {
    const t1 = hasValidHtml("leading text <span>hi</span> trailing text");
    expect(t1).toBe(true);
  });

  // NEGATIVE TESTING

  it("balanced but invalid tags", () => {
    const f1 = hasValidHtml("<spam>hi<spam>");
    expect(f1).toBe(false)
  });

  it("no html", () => {
    const f1 = hasValidHtml(" hi. 5<6 right? ");
    expect(f1).toBe(false)
  });

  it("imbalanced", () => {
    const f1 = hasValidHtml("<span>hi");
    expect(f1).toBe(false)
  });

  it("imbalanced nested", () => {
    const f1 = hasValidHtml("<div><span>hi</div>");
    expect(f1).toBe(false)
  });

  it("only atomic tags", () => {
    const t1 = hasValidHtml("<img src='test.jpg' />");
    expect(t1).toBe(true);
  });

  it("atomic tags nested in block tags", () => {
    const t1 = hasValidHtml("<div><img src='test.jpg' /></div>");
    expect(t1).toBe(true);
  });

  it("multiple atomic tags in sequence", () => {
    const t1 = hasValidHtml("<img src='1.jpg' /><img src='2.jpg' />");
    expect(t1).toBe(true);
  });

  it("empty string", () => {
    const t1 = hasValidHtml("");
    expect(t1).toBe(false);
  });


  it("invalid HTML-like string", () => {
    const f1 = hasValidHtml("<<html>invalid>");
    expect(f1).toBe(false);
  });

  it("mixed content with invalid tags", () => {
    const f1 = hasValidHtml("<div>hello<fake></fake></div>");
    expect(f1).toBe(false);
  });

  it("unmatched closing tag", () => {
    const f1 = hasValidHtml("</div>");
    expect(f1).toBe(false);
  });

  it("deeply nested valid HTML", () => {
    const t1 = hasValidHtml("<div><span><strong>Text</strong></span></div>");
    expect(t1).toBe(true);
  });

  it("deeply nested invalid HTML", () => {
    const f1 = hasValidHtml("<div><span><strong>Text</span></div>");
    expect(f1).toBe(false);
  });
});


describe("isValidHtmlTag()", () => {
  it("valid block tags", () => {
    const isValid = isValidHtmlTag("div", "span");
    expect(isValid("<div>")).toBe(true);
    expect(isValid("</div>")).toBe(true);
    expect(isValid("<span>")).toBe(true);
    expect(isValid("</span>")).toBe(true);
  });

  it("invalid block tags", () => {
    const isValid = isValidHtmlTag("div", "span");
    expect(isValid("<spam>")).toBe(false);
    expect(isValid("</spam>")).toBe(false);
    expect(isValid("<divert>")).toBe(false);
    expect(isValid("</divert>")).toBe(false);
  });

  it("valid atomic tags with close terminator", () => {
    const isValid = isValidHtmlTag("br", "img");
    expect(isValid("<br />")).toBe(true);
    expect(isValid("<img src='test.jpg' />")).toBe(true);
  });

  it("valid atomic tags without close terminator", () => {
    const isValid = isValidHtmlTag("br", "img");
    expect(isValid("<br>")).toBe(true);
    expect(isValid("<img src='test.jpg'>")).toBe(true);
  });

  it("atomic tags don't have closing tags", () => {
    const isValid = isValidHtmlTag("br", "img");
    expect(isValid("</br>")).toBe(false);
    expect(isValid("</img>")).toBe(false);
    expect(isValid("</br />")).toBe(false);
    expect(isValid("</img />")).toBe(false);
  })


  it("valid block tag but outside scope", () => {
    const isValid = isValidHtmlTag("div", "span");
    expect(isValid("<p>")).toBe(false);
    expect(isValid("</p>")).toBe(false);
  });

  it("valid atomic tag but outside scope", () => {
    const isValid = isValidHtmlTag("br");
    expect(isValid("<img>")).toBe(false);
    expect(isValid("<img />")).toBe(false);
  });

  it("invalid HTML structure", () => {
    const isValid = isValidHtmlTag("div");
    expect(isValid("div")).toBe(false);
    expect(isValid("<div extra")).toBe(false);
  });

  it("valid string attributes allowed", () => {
    const isValid = isValidHtmlTag("div", "span");
    // this isn't strictly HTML but single quotes should probably pass
    expect(isValid("<div class='foo hover:bg-red-400' id='bar'>")).toBe(true);
    // this is really the RIGHT way to test this
    expect(isValid(`<div class="foo hover:bg-red-400" id="bar">`)).toBe(true);
  });


  it("invalid attribute assignment fails", () => {
    const isValid = isValidHtmlTag("div", "span");
    expect(isValid("<div class='foo' id=>")).toBe(false);
  });


  it("valid boolean attributes allowed", () => {
    const isValid = isValidHtmlTag("div", "span");
    expect(isValid("<div disabled>")).toBe(true);
  });

  it("handles empty strings and whitespace", () => {
    const isValid = isValidHtmlTag("div");
    expect(isValid("")).toBe(false);
    expect(isValid("   ")).toBe(false);
  });

  it("handles non-string inputs", () => {
    const isValid = isValidHtmlTag("div");
    expect(isValid(123)).toBe(false);
    expect(isValid(null)).toBe(false);
    expect(isValid(undefined)).toBe(false);
    expect(isValid({})).toBe(false);
  });

  it("handles uppercase and mixed-case tag names", () => {
    const isValid = isValidHtmlTag("div", "span");
    expect(isValid("<DIV>")).toBe(true);
    expect(isValid("</DIV>")).toBe(true);
    expect(isValid("<Div>")).toBe(true);
    expect(isValid("</Div>")).toBe(true);
  });

  it("validates attributes with unbalanced quotes", () => {
    const isValid = isValidHtmlTag("div");
    expect(isValid("<div class='test id=\"foo\">")).toBe(false);
  });

  it("handles malformed HTML-like strings", () => {
    const isValid = isValidHtmlTag("div");
    expect(isValid("<>")).toBe(false);
    expect(isValid("<div")).toBe(false);
    expect(isValid("<div><div>")).toBe(false);
  });

  it("atomic tags with attributes and no close terminator are valid", () => {
    const isValid = isValidHtmlTag("img");
    expect(isValid("<img src='test.jpg'>")).toBe(true);
  });
});


describe("isHtmlComponentTag", () => {
  it("valid kebab-case component tags", () => {
    const isValid = isHtmlComponentTag("image-gallery", "video-player");
    expect(isValid("<image-gallery>")).toBe(true);
    expect(isValid("<image-gallery autoplay>")).toBe(true);
    expect(isValid("<video-player autoplay>")).toBe(true);
    expect(isValid("</image-gallery>")).toBe(true);
    expect(isValid("</video-player>")).toBe(true);
  });

  it("valid PascalCase component tags", () => {
    const isValid = isHtmlComponentTag("image-gallery", "video-player");
    expect(isValid("<ImageGallery>")).toBe(true);
    expect(isValid("<ImageGallery autoplay>")).toBe(true);
    expect(isValid("<VideoPlayer autoplay>")).toBe(true);
    expect(isValid("</ImageGallery>")).toBe(true);
    expect(isValid("</VideoPlayer>")).toBe(true);
  });

  it("valid self-closing component tags", () => {
    const isValid = isHtmlComponentTag("image-gallery", "video-player");
    expect(isValid("<image-gallery />")).toBe(true);
    expect(isValid("<ImageGallery />")).toBe(true);
    expect(isValid("<video-player autoplay />")).toBe(true);
    expect(isValid("<VideoPlayer autoplay />")).toBe(true);
  });

  it("invalid component tags", () => {
    const isValid = isHtmlComponentTag("image-gallery", "video-player");
    expect(isValid("<invalid-component>")).toBe(false);
    expect(isValid("</invalid-component>")).toBe(false);
    expect(isValid("<invalid-component />")).toBe(false);
    expect(isValid("</InvalidComponent>")).toBe(false);
  });

  it("component tags with invalid attributes", () => {
    const isValid = isHtmlComponentTag("image-gallery", "video-player");
    expect(isValid("<image-gallery autoplay=>")).toBe(false);
    expect(isValid("<ImageGallery autoplay= >")).toBe(false);
    expect(isValid("<video-player autoplay='test ></video-player>")).toBe(false);
    expect(isValid("<VideoPlayer autoplay='test >")).toBe(false);
  });

  it("valid tags but outside provided scope", () => {
    const isValid = isHtmlComponentTag("image-gallery");
    expect(isValid("<video-player>")).toBe(false);
    expect(isValid("<VideoPlayer>")).toBe(false);
  });

  it("handles non-string inputs", () => {
    const isValid = isHtmlComponentTag("image-gallery");
    expect(isValid(123)).toBe(false);
    expect(isValid(null)).toBe(false);
    expect(isValid(undefined)).toBe(false);
    expect(isValid({})).toBe(false);
  });

  it("validates mixed-case component tags", () => {
    const isValid = isHtmlComponentTag("image-gallery");
    expect(isValid("<Image-Gallery>")).toBe(false);
    expect(isValid("<image-Gallery>")).toBe(false);
  });

  it("wide string handling for dynamic input", () => {
    const isValid = isHtmlComponentTag("image-gallery");
    const dynamicTag = "<ImageGallery autoplay />" as string;
    expect(isValid(dynamicTag)).toBe(true);
  });


  it("single word components", () => {
    const isValid = isHtmlComponentTag("gallery");
    expect(isValid("<Gallery>")).toBe(true);
    expect(isValid("<gallery>")).toBe(true);
  });

});

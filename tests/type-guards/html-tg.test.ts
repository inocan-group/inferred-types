import { } from "@type-challenges/utils";
import { hasHtml, hasValidHtml, isHtml, isValidHtml } from "inferred-types/runtime";
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

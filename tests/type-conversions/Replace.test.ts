import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { LowerAlphaChar, Replace, ReplaceAll, UpperAlphaChar } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Replace<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = Replace<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = Replace<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    type WideStr = Replace<string, "a", "b">;

    type cases = [
      Expect<Equal<Foobar, "Must be foobar">>,
      Expect<Equal<Duplicate, "Must be foobar; really it must be [[T]]">>,
      Expect<Equal<WideStr, string>>
    ];
    const cases: cases = [
      true, true, true
    ];
  });


  it("empty string tests", () => {
    type EmptyText = Replace<"","foo","bar">;
    type BothEmpty = Replace<"","","bar">;

    // @ts-ignore
    type cases = [
      Expect<Equal<EmptyText, "">>,
      Expect<Equal<BothEmpty, "bar">>,
    ];
  });


  it("union type in TText", () => {
    type Text = "foobar" | "bazfoo";
    type R = Replace<Text, "foo", "bar">;

    // @ts-ignore
    type cases = [
      Expect<Equal<R, "barbar" | "bazbar">>,
    ];
  });

  /** should replace first instance in each variant of union but not others */
  it("union type in TText with multi-match", () => {
    type Text = "foobar, foo" | "bazfoo, foo";
    type R = Replace<Text, "foo", "bar">;

    // @ts-ignore
    type cases = [
      Expect<Equal<R, "barbar, foo" | "bazbar, foo">>,
    ];
  });



});

describe("ReplaceAll<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = ReplaceAll<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = ReplaceAll<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    type WideStr = Replace<string, "a", "b">;
    type Curly = ReplaceAll<"https://www.amazon.com/{{ string }}storeType=ebooks{{ string }}",  "{{ string }}", `${string}`>

    // @ts-ignore
    type cases = [
      Expect<Equal<Foobar, "Must be foobar">>,
      Expect<Equal<Duplicate, "Must be foobar; really it must be foobar">>,
      Expect<Equal<WideStr, string>>,
      Expect<Equal<Curly, `https://www.amazon.com/${string}storeType=ebooks${string}`>>
    ];
  });


  it("using a union type for TFind", () => {
    type Lowered = ReplaceAll<"And there she WAS", UpperAlphaChar, "">;
    type Raised = ReplaceAll<"And there she WAS", LowerAlphaChar | " ", "">;

    type cases = [
      Expect<Equal<Lowered, "nd there she ">>,
      Expect<Equal<Raised, "AWAS">>,
    ];
    const cases: cases = [
      true, true
    ];

  });

  it("union type in TText", () => {
    type Text = "foobar" | "bazfoo";
    type R = ReplaceAll<Text, "foo", "bar">;

    // @ts-ignore
    type cases = [
      Expect<Equal<R, "barbar" | "bazbar">>,
    ];
  });

  /** should replace ALL instances of "foo" in each variant of union */
  it("union type in TText with multi-match", () => {
    type Text = "foobar, foo" | "bazfoo, foo";
    type Curly = "{{ string }}bar, {{ string }}" | "{{ string }}baz, {{ string }}";
    type R = ReplaceAll<Text, "foo", "bar">;
    type R2 = ReplaceAll<Curly, "{{ string }}", "foo">;


    // @ts-ignore
    type cases = [
      Expect<Equal<R, "barbar, bar" | "bazbar, bar">>,
      Expect<Equal<R2, "foobar, foo" | "foobaz, foo">>,
    ];
  });


  it("an array of values for TText with multi-match", () => {
    const string = "{{ string }}";
    const books = [
      `https://www.amazon.com/${string}storeType=ebooks${string}`,
      `https://www.amazon.com/${string}ref=tmm_hrd_swatch${string}`
    ] as const;

    type Back = ReplaceAll<typeof books, "{{ string }}", `${string}`>;


    // @ts-ignore
    type cases = [
      Expect<Equal<typeof books, readonly [
        `https://www.amazon.com/{{ string }}storeType=ebooks{{ string }}`,
        `https://www.amazon.com/{{ string }}ref=tmm_hrd_swatch{{ string }}`
      ]>>,
      Expect<Equal<Back, [
        `https://www.amazon.com/${string}storeType=ebooks${string}`,
        `https://www.amazon.com/${string}ref=tmm_hrd_swatch${string}`
      ]>>
    ];

  });



});

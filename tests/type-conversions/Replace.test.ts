import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import {
  ReplaceAllFromTo,
  ReplaceFromTo,
  ReplaceKeys,
  LowerAlphaChar,
  Replace,
  ReplaceAll,
  UpperAlphaChar,
  Test
} from "inferred-types/types";
import { replace, replaceAll, replaceAllFromTo } from "inferred-types/runtime";

describe("Replace<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = Replace<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = Replace<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    type WideStr = Replace<string, "a", "b">;

    type cases = [
      Expect<Test<Foobar, "equals",  "Must be foobar">>,
      Expect<Test<Duplicate, "equals",  "Must be foobar; really it must be [[T]]">>,
      Expect<Test<WideStr, "equals",  string>>
    ];
    const cases: cases = [
      true, true, true
    ];
  });


  it("empty string tests", () => {
    type EmptyText = Replace<"", "foo", "bar">;
    type BothEmpty = Replace<"", "", "bar">;

    type cases = [
      Expect<Test<EmptyText, "equals",  "">>,
      Expect<Test<BothEmpty, "equals",  "bar">>,
    ];
  });


  it("union type in TText", () => {
    type Text = "foobar" | "bazfoo";
    type R = Replace<Text, "foo", "bar">;

    type cases = [
      Expect<Test<R, "equals",  "barbar" | "bazbar">>,
    ];
  });

  /** should replace first instance in each variant of union but not others */
  it("union type in TText with multi-match", () => {
    type Text = "foobar, foo" | "bazfoo, foo";
    type R = Replace<Text, "foo", "bar">;

    type cases = [
      Expect<Test<R, "equals",  "barbar, foo" | "bazbar, foo">>,
    ];
  });
});

describe("replace()", () => {

    it("happy path", () => {
      const fooBarb = replace("booBarb", "b", "f");

      expect(fooBarb).toEqual("fooBarb")

      type cases = [
        Expect<Test<typeof fooBarb, "equals",  "fooBarb">>,
      ];
    });


})



describe("ReplaceAll<TText,TFind,TReplace>", () => {

  it("happy path", () => {
    type Foobar = ReplaceAll<"Must be [[T]]", "[[T]]", "foobar">;
    type Duplicate = ReplaceAll<"Must be [[T]]; really it must be [[T]]", "[[T]]", "foobar">;
    type WideStr = Replace<string, "a", "b">;
    type Curly = ReplaceAll<"https://www.amazon.com/{{ string }}storeType=ebooks{{ string }}", "{{ string }}", `${string}`>

    type cases = [
      Expect<Test<Foobar, "equals",  "Must be foobar">>,
      Expect<Test<Duplicate, "equals",  "Must be foobar; really it must be foobar">>,
      Expect<Test<WideStr, "equals",  string>>,
      Expect<Test<Curly, "equals",  `https://www.amazon.com/${string}storeType=ebooks${string}`>>
    ];
  });


  it("using a union type for TFind", () => {
    type Lowered = ReplaceAll<"And there she WAS", UpperAlphaChar, "">;
    type Raised = ReplaceAll<"And there she WAS", LowerAlphaChar | " ", "">;

    type cases = [
      Expect<Test<Lowered, "equals",  "nd there she ">>,
      Expect<Test<Raised, "equals",  "AWAS">>,
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
      Expect<Test<R, "equals",  "barbar" | "bazbar">>,
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
      Expect<Test<R, "equals", "barbar, bar" | "bazbar, bar">>,
      Expect<Test<R2,  "equals","foobar, foo" | "foobaz, foo">>,
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
      Expect<Equal<Back, readonly [
        `https://www.amazon.com/${string}storeType=ebooks${string}`,
        `https://www.amazon.com/${string}ref=tmm_hrd_swatch${string}`
      ]>>
    ];

  });
});

describe("ReplaceFromTo<TText,TFromTo>", () => {
  it("Using ToFrom[] to replace multiple things", () => {
    type Fooy = "fooy";
    // "Pooey"
    type Pooey = ReplaceFromTo<Fooy, [
      { from: "y"; to: "ey" },
      { from: "f"; to: "P" }
    ]>

    type cases = [
      Expect<Test<Pooey, "equals",  "Pooey">>,
    ];
  });
});

describe("ReplaceAllFromTo<TText,TFromTo>", () => {
  it("Using ToFrom[] to replace multiple things", () => {
    type Dashing = ReplaceAllFromTo<"Foo Bar Baz", [
      { from: " "; to: "-" },
      { from: "B"; to: "b" }
    ]>

    type cases = [
      Expect<Test<Dashing, "equals",  "Foo-bar-baz">>,
    ];
  });
});

describe("replaceAll()", () => {
    it("happy path", () => {
      const fooBarf = replaceAll("booBarb", "b", "f");
      expect(fooBarf).toEqual("fooBarf")

      type cases = [
        Expect<Test<typeof fooBarf, "equals",  "fooBarf">>,
      ];
    });
})

describe("replaceAllFromTo()", () => {
    it("happy path", () => {
      const template = replaceAllFromTo(
        "There I was, in the {{string}}! As well as some {{number}} year monkey.",
        {
            "{{string}}": "jungle",
            "{{number}}": "5"
        }
        );
      expect(template).toEqual("There I was, in the jungle! As well as some 5 year monkey.")

      type cases = [
        Expect<Test<typeof template, "equals", "There I was, in the jungle! As well as some 5 year monkey.">>,
      ];
    });
})

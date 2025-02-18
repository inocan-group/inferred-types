import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import { Extends, KeyValue } from "inferred-types/types";
// import { asChars } from "inferred-types/runtime"
import { toKeyValue, fromKeyValue } from "inferred-types/runtime";

// const a = asChars("foobar");

describe("toKeyValue(obj)", () => {

  it("happy path", () => {
    const fooBar = toKeyValue({ foo: 1, bar: "hi" });

    expect(fooBar).toEqual([
      { key: "foo", value: 1 },
      { key: "bar", value: "hi" }
    ])

    type cases = [
      Expect<Equal<
        typeof fooBar,
        [
          { key: "foo", value: 1 },
          { key: "bar", value: "hi" }
        ]
      >>
    ];
  });

  it("forcing a key to top", () => {
    const fooBar = toKeyValue({ foo: 1, bar: "hi", id: 123 }, o => o.toTop("id"));

    expect(fooBar, JSON.stringify(fooBar)).toEqual([
      { key: "id", value: 123 },
      { key: "foo", value: 1 },
      { key: "bar", value: "hi" },
    ])

    type cases = [
      Expect<Equal<
        typeof fooBar,
        [
          { key: "id", value: 123 },
          { key: "foo", value: 1 },
          { key: "bar", value: "hi" }
        ]
      >>
    ];
  });


  it("Obsidian example", () => {
    const fmKv = toKeyValue({
      "company": "[[Anthropic]]",
      "kind": "[[AI Model]]",
      "category": "[[LLM]]",
      "aliases": [
        "Haiku"
      ],
      "desc": "The fast and lightweight sibling in the Claude family (Anthropic)",
      "subcategory": "[[Lightweight Model]]",
      "type": "[[kind/types/AI.md|AI]]"
    }, o => o.toTop("type", "kind", "category", "subcategory").toBottom("desc"));

    const keys = fmKv.map(i => i.key);

    expect(keys).toEqual([
      "type", "kind", "category", "subcategory",
      "company", "aliases",
      "desc"
    ]);

    const fm = fromKeyValue(fmKv);

    expect(fm).toEqual({
      type: "[[kind/types/AI.md|AI]]",
      kind: "[[AI Model]]",
      category: "[[LLM]]",
      subcategory: "[[Lightweight Model]]",
      company: "[[Anthropic]]",
      aliases: ["Haiku"],
      desc: "The fast and lightweight sibling in the Claude family (Anthropic)"
    });

    type cases = [
      Expect<Extends<typeof fmKv, KeyValue[]>>,
      Expect<Equal<
        typeof fm,
        {
          type: "[[kind/types/AI.md|AI]]";
          kind: "[[AI Model]]";
          category: "[[LLM]]";
          subcategory: "[[Lightweight Model]]";
          company: "[[Anthropic]]";
          aliases: string[];
          desc: "The fast and lightweight sibling in the Claude family (Anthropic)";
        }
      >>
    ];

  });

});



describe("fromKeyValue(kvs)", () => {
  const fooBar = fromKeyValue([
    { key: "id", value: 123 },
    { key: "foo", value: 1 },
    { key: "bar", value: "hi" },
  ]);

  it("first test", () => {

    expect(fooBar).toEqual({ id: 123, foo: 1, bar: "hi" })

    // @ts-ignore
    type cases = [
      Expect<Equal<typeof fooBar, { id: 123, foo: 1, bar: "hi" }>>,
    ]
  });

});


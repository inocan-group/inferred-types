import { Equal, Expect } from "@type-challenges/utils";
import { ReplaceKeys } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ReplaceKeys<TText,TFromTo>", () => {
  it("Using ToFrom[] to replace multiple things", () => {
    type Obj = { _foo: 1; _bar: 2; _baz: 3 }
    type FooBarBaz = ReplaceKeys<Obj, [
      { from: "_"; to: "" },
      { from: "b"; to: "B" },
      { from: "f"; to: "F" }
    ]>

    type cases = [
      Expect<Equal<FooBarBaz, { Foo: 1; Bar: 2; Baz: 3 }>>,
    ];
  });

  it("Using Dictionary definition to replace multiple keys", () => {
    type Obj = { _foo: 1; _bar: 2; _baz: 3 }
    type FooBarBaz = ReplaceKeys<Obj, {
      "_": "",
      "b": "B",
      "f": "F"
    }>

    type cases = [
      Expect<Equal<FooBarBaz, { Foo: 1; Bar: 2; Baz: 3 }>>,
    ];
  });


  it("testing deep replacement", () => {
    type Obj = { _foo: { _bar_: 2; _baz: 3 } }
    type FooBarBaz = ReplaceKeys<Obj, [
      { from: "_"; to: "" },
      { from: "b"; to: "B" },
      { from: "f"; to: "F" }
    ]>
    type Explicit = ReplaceKeys<Obj, [
      { from: "_"; to: "" },
      { from: "b"; to: "B" },
      { from: "f"; to: "F" }
    ]>

    type cases = [
      Expect<Equal<FooBarBaz, { Foo: { Bar: 2; Baz: 3 } }>>,
      Expect<Equal<Explicit, { Foo: { Bar: 2; Baz: 3 } }>>,
    ];
  });


  it("testing with replacing only first instance", () => {
    type Obj = { _foo_: { _bar_: 2; _baz: 3 } }
    type FooBarBaz = ReplaceKeys<Obj, [
      { from: "_"; to: "" },
      { from: "b"; to: "B" },
      { from: "f"; to: "F" }
    ], { replaceAll: false }>

    type cases = [
      Expect<Equal<FooBarBaz, { Foo_: { Bar_: 2; Baz: 3 } }>>,
    ];
  });



  it("convert to specific casing", () => {
    type Obj = { foo_bar: { "bar-baz": 2; } }
    type Camel = ReplaceKeys<Obj, { foo: "foey" }, { casing: "CamelCase" }>;
    type Pascal = ReplaceKeys<Obj, { foo: "foey" }, { casing: "PascalCase" }>;
    type Kebab = ReplaceKeys<Obj, { foo: "foey" }, { casing: "KebabCase" }>;
    type Snake = ReplaceKeys<Obj, { foo: "foey" }, { casing: "SnakeCase" }>;

    type cases = [
      Expect<Equal<Camel, { foeyBar: { barBaz: 2 } }>>,
      Expect<Equal<Pascal, { FoeyBar: { BarBaz: 2 } }>>,
      Expect<Equal<Kebab, { "foey-bar": { "bar-baz": 2 } }>>,
      Expect<Equal<Snake, { foey_bar: { bar_baz: 2 } }>>,
    ];
  });

});

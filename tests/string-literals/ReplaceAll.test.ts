import { Equal, Expect } from "@type-challenges/utils";
import { ReplaceAll } from "inferred-types/types";
import { describe, it } from "vitest";

describe("ReplaceAll<TText,TFind,TReplace>", () => {

  it("single text element", () => {
    type FooBaz = ReplaceAll<"FooBar", "Bar", "Baz">;
    type Three = ReplaceAll<"FooBarFoo", "Foo", "Bar">;

    type cases = [
      Expect<Equal<FooBaz, "FooBaz">>,
      Expect<Equal<Three, "BarBarBar">>,
    ];
  });


  it("multiple text elements", () => {
    type Foo = ReplaceAll<["Foo", "Bar"], "Bar", "Foo">

    type cases = [
      Expect<Equal<Foo, ["Foo", "Foo"]>>
    ];
  });

});

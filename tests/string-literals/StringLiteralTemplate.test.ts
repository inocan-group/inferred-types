import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { StringLiteralTemplate } from "inferred-types/types";

describe("StringLiteralTemplate<T>", () => {

  it("happy path", () => {
    type FooSomething = StringLiteralTemplate<"Foo{{string}}">;
    type Multiply = StringLiteralTemplate<"{{number}} x {{number}}">;

    type cases = [
        Expect<Test<FooSomething, "equals",  `Foo${string}`>>,
        Expect<Test<Multiply, "equals",  `${number} x ${number}`>>,
    ];
  });

});



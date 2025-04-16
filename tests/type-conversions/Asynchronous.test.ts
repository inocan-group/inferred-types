import { Equal, Expect } from "@type-challenges/utils";
import { Asynchronous } from "inferred-types/types";
import { describe, it } from "vitest";

describe("Asynchronous<T>", () => {

  it("happy path", () => {
    type Str = Asynchronous<string>;
    type AStr = Asynchronous<Promise<string>>;
    type Like = {
        then(): string;
    }

    type LStr = Asynchronous<Like>;
    type PP = Asynchronous<Promise<string>>;

    type cases = [
        Expect<Equal<Str, Promise<string>>>,
        Expect<Equal<AStr, Promise<string>>>,
        Expect<Equal<LStr, LStr>>,
        Expect<Equal<PP, Promise<string>>>,
    ];
  });

});

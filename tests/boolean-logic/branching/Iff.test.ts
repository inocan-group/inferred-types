import { Equal, Expect, ExpectTrue } from "@type-challenges/utils";
import { EmptyObject, ErrorCondition, Iff, IsErrorCondition } from "src/types/index";
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Iff<TValues,[TIgnore],[TOffset],[TNotFound]>", () => {

  it("happy path", () => {
    type Foo = Iff<[undefined, undefined, "foo"]>;
    type MoreFoo = Iff<[undefined, null, "foo"], undefined | null>;
    type ImmediateFoo = Iff<["foo", undefined, undefined]>;

    type BaseErr = Iff<[undefined, undefined, undefined]>;
    
    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<MoreFoo, "foo">>,
      Expect<Equal<ImmediateFoo, "foo">>,

      ExpectTrue<IsErrorCondition<BaseErr, "not-found">>
    ];
    const cases: cases = [
      true, true, true,
      true,
    ];
  });

  
  it("indexing into containers", () => {
    type Foo = Iff<[EmptyObject, EmptyObject, {id: "foo"}], ErrorCondition, "id">;
    type Foo2 = Iff<[undefined, undefined, {id: "foo"}], undefined, "id">;

    type cases = [
      Expect<Equal<Foo, "foo">>,
      Expect<Equal<Foo2, "foo">>,
    ];
    const cases: cases = [
      true, true
    ];
    
  });
  

});

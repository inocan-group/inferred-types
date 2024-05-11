import { ExpectTrue, ExpectFalse } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { IsLiteral,  EmptyObject, IndexableObject, IsObjectLiteral, ExplicitlyEmptyObject, KV } from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("IsLiteral<T>", () => {

  it("positive tests", () => {
    type T1 = IsLiteral<"foo">;
    type T2 = IsLiteral<42>;
    type T3 = IsLiteral<true>;
    type T4 = IsLiteral<false>;
    type T5 = IsLiteral<{ foo: number }>;
    type T6 = IsLiteral<["foo", "bar", "baz"]>;
    
    type cases = [
      ExpectTrue<T1>,
      ExpectTrue<T2>,
      ExpectTrue<T3>,
      ExpectTrue<T4>,
      ExpectTrue<T5>,
      ExpectTrue<T6>,
    ];
    const cases: cases = [ true, true, true , true, true, true   ];
  });

  
  it("negative tests", () => {
    type F1 = IsLiteral<string>;
    type F2 = IsLiteral<number>;
    type F3 = IsLiteral<boolean>;
    type F4 = IsLiteral<object>;    
    type F5 = IsLiteral<string[]>;
    type F6 = IsLiteral<readonly string[]>;
    
    type cases = [
      ExpectFalse<F1>,
      ExpectFalse<F2>,
      ExpectFalse<F3>,
      ExpectFalse<F4>,
      ExpectFalse<F5>,
      ExpectFalse<F6>,
    ];
    const cases: cases = [ false, false, false, false, false, false ];
    
  });

  
  it("Edge Cases", () => {
    type Empty = IsLiteral<EmptyObject>;
    type Explicit = IsLiteral<ExplicitlyEmptyObject>;
    type BaseKV = IsObjectLiteral<KV>;
    type IndexableWithExplicit = IsObjectLiteral<IndexableObject< {foo: 42 }>>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    type Curly = IsLiteral<{}>;
    
    type cases = [
      // an empty object still allows key/value pairs to be added after it
      // is declared so it is NOT a literal
      ExpectFalse<Empty>,
      // an explicitly empty object -- which has it's index keys set to _never_
      // -- can never have any key/values and therefore IS a literal
      ExpectTrue<Explicit>,
      // a type marked at `KV` is generic; it can take any normal key/value
      // pair that an object is allowed so therefore it is NOT literal
      ExpectFalse<BaseKV>,
      // an indexable object with at least one _known_ key is
      // now considered a literal type even though we may not
      // know all the keys at design time.
      ExpectTrue<IndexableWithExplicit>,
      // the `{}` type is quite misunderstood and really should be called
      // `Something` (which we do export as a symbol in this lib). Effectively
      // it is just any value except for **null** and **undefined**.
      ExpectFalse<Curly>,
      
    ];
    const cases: cases = [ false, true, false, true, false ];
    
  });
  
  

});

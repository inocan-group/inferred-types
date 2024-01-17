import { Equal, Expect } from "@type-challenges/utils";
import { describe, it } from "vitest";

import { AsError, DoesExtend, EmptyObject, ErrorCondition } from "src/types/index";

describe("AsError<T>", () => {
  type Err = ErrorCondition<"err", "oops", null>;

  it("raw property check on ErrorCondition", () => {
    type cases = [
      Expect<Equal<Err["kind"], "err">>,
      Expect<Equal<Err["message"], "oops">>,
      Expect<Equal<Err["context"], EmptyObject>>,
      Expect<Equal<Err["stack"], []>>,

      Expect<Equal<Err["id"], never>>,
      Expect<Equal<Err["utility"], never>>,
      Expect<Equal<Err["library"], never>>,
    ];
    const cases: cases = [
      true, true, true, true,
      true, true, true
    ];
  });
  
  it("proxy an ErrorCondition", () => {
    type Proxy = AsError<Err>;
    
    type cases = [
      Expect<Equal<Proxy, Err>>
    ];
    const cases: cases = [ true ];
  });

  it("handle JS Error class", () => {
    const err = new Error("oops");
    err.name = "OopsError";

    type Runtime = AsError<typeof err>;
    
    type cases = [
      Expect<DoesExtend<Runtime, ErrorCondition<"runtime-error">>>
    ];
    const cases: cases = [ true ];
  });

  
  it("tuple errors", () => {
    type SimpleErr = AsError<["err","oops"]>;
    type WithContext = AsError<["err","oops", { context: { foo: 1; bar: 2}}]>;
    
    type cases = [
      Expect<Equal<SimpleErr, ErrorCondition<"err","oops",null>>>,
      Expect<DoesExtend<WithContext, ErrorCondition<"err","oops",{context: {foo: 1; bar: 2}}>>>,
    ];
    const cases: cases = [ true, true ];
    
  });
  
  

});

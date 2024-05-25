import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, it } from "vitest";
import { 
  Api,
  ApiCallback, 
  ErrorCondition, 
  EscapeFunction, 
  Extends, 
  GetEscapeFunction, 
  HasEscapeFunction, 
  IsErrorCondition,
  TypedFunction
} from "src/types/index";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("API related type utilities", () => {
  
  it("Escape Functions", () => {
    type OWith = {
      age: () => number;
      name: () => string;
      done: EscapeFunction<() => `done`>;
    };
    type OWithout = {
      age: () => number;
      name: () => string;
      done: () => `done`;
    };
    type Fn = EscapeFunction<() => `done`> & { age: () => number };
    
    type cases = [
      ExpectTrue<HasEscapeFunction<OWith>>,
      ExpectFalse<HasEscapeFunction<OWithout>>,
      ExpectTrue<HasEscapeFunction<Fn>>,

      Expect<Equal<
        GetEscapeFunction<OWith>, 
        EscapeFunction<() => `done`>
      >>,
      Expect<Equal<
        GetEscapeFunction<Fn>, 
        EscapeFunction<(() => `done`) & {age: () => number}>
      >>,
    ];
    const cases: cases = [
      true, false, true,
      true, true
    ];
    
  });
  
  it("Api<TSurface,TOpts>", () => {
    // basics
    type Valid = Api<{ age: () => number; done: EscapeFunction<() => `done`> }>;
    type ValidFn = Api<EscapeFunction<() => `done`> & { 
      /** an age prediction */
      age: () => number;
    }>;
    type Invalid = Api<{ age: () => number }>;
    
    type cases = [
      Expect<Equal<
        Valid,
        { age: () => number; done: EscapeFunction<() => `done`> }
      >>,
      Expect<Extends<Invalid, ErrorCondition<"no-escape-function">>>,
      Expect<Equal<
        ValidFn,
        (() => `done`) & {
          escape: true;
        } & {
            age: () => number;
        }
      >>,
    ];
    const cases: cases = [
      true, true,true
    ];
    
  });
  
  


  it("happy path for API Callback definition", () => {
    type Guess = Api<{
      /** guess of your age */
      guessAge: () => number;
      guessName: () => string;
      done: EscapeFunction<() => `hi`>;
    }>;

    type Abstracted<T> = Api<{
      whatNow: () => number;
      done: EscapeFunction<() => T>;
    }>;
    type _AbstractedCallback<T> = ApiCallback<Abstracted<T>>;
    
    type GuessCallback = ApiCallback<Guess>;
    type GuessCallback42 = ApiCallback<Guess, {proxy: [42]}>;


    type cases = [
      ExpectFalse<IsErrorCondition<Guess>>,

      Expect<Extends<GuessCallback, TypedFunction>>,
      Expect<Equal<Parameters<GuessCallback>["length"], 1>>,
      Expect<Extends<Parameters<GuessCallback>[0], TypedFunction>>,

      Expect<Extends<Parameters<GuessCallback42>[0], TypedFunction | 42>>,

      Expect<Equal<ReturnType<Abstracted<string>["done"]>, string>>, 
      Expect<Equal<ReturnType<Abstracted<number>["done"]>, number>>, 

    ];
    const cases: cases = [
      false,
      true, true, true,
      true,
      true, true
    ];
  });

});


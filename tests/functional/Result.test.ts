import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { DoesExtend, Err, ErrKind, ErrMsg, GetErr, IsErr, IsOk, IsResult, Ok, Result } from "src/types/index";
import { RESULT } from "src/constants/index"
import { ok, err, okN, assertErr } from "src/runtime/index"
import { describe, it } from "vitest";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to 
// gain validation that no new type vulnerabilities have cropped up.

describe("Result<T,E> and Utils", () => {

  it("happy path", () => {
    type R = Result<number, "oops">;
    type R2 = Result<string, ["help!",  "string-error"]>;
    type R3 = Result<string, {msg: "help!"; context: { foo: 1; bar: 2}}>;

    type Five = Ok<5>;
    type SimpleErr = Err<"Oops">;

    type ObjErr = Err<[ "Oops", "uh-oh", {expected: 5; got: 42} ]>;
    type SimpleMsg = ErrMsg<SimpleErr>;
    type ObjMsg = ErrMsg<ObjErr>;
    type SimpleKind = ErrKind<SimpleErr>;
    type ObjKind = ErrKind<ObjErr>;

    type x = GetErr<{state: typeof RESULT.Err }>;
    
    type cases = [
      ExpectTrue<IsResult<R>>,
      ExpectTrue<IsResult<R2>>,
      ExpectTrue<IsResult<R3>>,

      Expect<Equal<
        GetErr<R3>,
        {
          msg: "help!";
          kind: "undefined";
          context: {
            foo: 1;
            bar: 2;
          };
        }
      >>,

      ExpectTrue<IsOk<Five>>,
      Expect<Equal<Five, { state: typeof RESULT.Ok; val: 5}>>,
      ExpectTrue<IsResult<Five>>,

      Expect<Equal<SimpleMsg, "Oops">>,
      Expect<Equal<SimpleKind, "undefined">>,
      ExpectTrue<IsErr<SimpleErr>>,
      ExpectTrue<IsResult<SimpleErr>>,
      ExpectTrue<IsErr<SimpleErr>>,
      Expect<Equal<SimpleErr["err"], { msg: "Oops"; kind: "undefined"; context: null}>>,

      Expect<Equal<ObjMsg, "Oops">>,
      Expect<Equal<ObjKind, "uh-oh">>,
      ExpectTrue<IsErr<ObjErr, [ "Oops", "uh-oh", {expected: 5; got: 42} ]>>,
      ExpectTrue<IsResult<ObjErr>>,
      Expect<Equal<ObjErr["err"], { 
        kind: "uh-oh";
        msg: "Oops";
        context: {
          expected: 5; 
          got: 42;
        };
      }>>,
    ];
    const cases: cases = [
      true,true,true,
      true,
      true,true,true,
      true,true,true,true, true, true, 
      true,true, true,true, true
    ];
  });

});

describe("ok(), err(), isOk() and other Result runtime utils", () => {


it("runtime happy path", () => {
  const five = ok(5);
  const five_n = okN(5);

  const simple = err("oops");

  const asserted_err = assertErr(simple);

  const err_result: Result<number, "oops"> = err("oops");
  const ok_result: Result<number, "oops"> = ok(5);
  
  const expected = err(
    "oops", 
    "invalid-value", 
    { expected: 5, got: 42 }
  );

  type Expected = Err<[
    "oops", 
    "invalid-value", 
    {
      expected: number;
      got: number;
    }
  ]>;
  
  type cases = [
    Expect<Equal<typeof five, Ok<number>>>,
    Expect<Equal<typeof five_n, Ok<5>>>,

    Expect<Equal<typeof simple, Err<["oops", "undefined", null]>>>,

    ExpectTrue<typeof asserted_err>,

    ExpectTrue<IsResult<typeof err_result>>,
    ExpectTrue<IsResult<typeof err_result, number, "oops">>,
    // string is the wrong value type so this does not pass
    ExpectFalse<IsResult<typeof err_result, string>>,
    ExpectTrue<IsResult<typeof ok_result, number>>,
    ExpectFalse<IsResult<typeof ok_result, string>>,
    ExpectTrue<IsResult<typeof ok_result>>,
    // we've masked it's value so we'll need to determine at runtime
    // whether it's a 
    Expect<Equal<IsErr<typeof err_result, "oops">, boolean>>, 
    // because the error type doesn't match we can determine
    // that it is NOT the expected error at design time.
    Expect<Equal<IsErr<typeof err_result, "nada">, false>>, 
    ExpectTrue<IsOk<typeof ok_result>>,

    Expect<Equal<typeof expected, Expected>>
  ];
  const cases: cases = [
    true, true,
    true,
    true,
    true, true, false, true, false, true, true,true,true,
    true
  ];
  
});


});


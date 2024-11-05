/* eslint-disable @typescript-eslint/ban-types */
import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe,  it } from "vitest";
import {
  AsErrKind,
  Err,
  ErrFrom,
  IsErr,
  IsOk,
  IsResult,
  KindFrom,
  Ok,
  Result,
  OkFrom
} from "inferred-types";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("Result<T,E> and Utils", () => {

  it("happy path", () => {
    type EFoo = AsErrKind<"foo">;
    type EDire = AsErrKind<{
      kind: "dire-straights";
      context: {foo: 1; bar: 2};
    }>;
    type EShit = AsErrKind<"shit gone crazy">;

    type R1 = Result<number, EFoo>;
    type R2 = Result<string, EDire>;
    type R3 = Result<{foo: number; bar: string}, EShit>;
    type RM = Result<string, [EFoo, EDire]>;

    type Five = Ok<5>;
    type FiveIsOk = IsOk<Five>;
    type FiveIsOk2 = IsOk<Five, number>;
    type SomethingsWrongWithFive = IsOk<Five, string>;

    type SimpleErr = Err<"UhOh">;

    type cases = [
      Expect<Equal<EFoo, {kind: "foo"; msg: string; context: {}; stack: false}>>,
      Expect<Equal<EDire, {
        kind: "dire-straights"; msg: string; context: { foo: number; bar: number}; stack: false;
      }>>,
      Expect<Equal<EShit, {kind: "shit-gone-crazy"; msg: string; context: {}; stack: false }>>,

      ExpectTrue<IsResult<R1>>,
      ExpectTrue<IsResult<R2>>,
      ExpectTrue<IsResult<R3>>,
      ExpectTrue<IsResult<RM>>,

      Expect<Equal<ErrFrom<R1>, EFoo>>,
      Expect<Equal<KindFrom<R1>, "foo">>,
      Expect<Equal<OkFrom<R1>, number>>,

      ExpectTrue<IsResult<R1, number, EFoo>>,
      ExpectTrue<IsResult<R2, string, EDire>>,
      ExpectTrue<IsResult<R3, {foo: number; bar: string}, EShit>>,
      ExpectTrue<IsResult<RM, string, EFoo | EDire>>,

      ExpectFalse<IsResult<R1, string, EFoo>>, // wrong val
      ExpectFalse<IsResult<R1, number, EShit>>, // wrong err

      Expect<Equal<Five["val"], 5>>,
      Expect<Equal<FiveIsOk, true>>,
      Expect<Equal<FiveIsOk2, true>>,
      Expect<Equal<SomethingsWrongWithFive, false>>,
      Expect<Equal<IsErr<Five>, false>>,

      Expect<Equal<
        SimpleErr["err"],
        { msg: "UhOh"; kind: "uh-oh"; context: {}; stack: false }
      >>,
      ExpectTrue<IsErr<SimpleErr>>,
      ExpectTrue<IsErr<SimpleErr, "UhOh">>,
      ExpectFalse<IsErr<SimpleErr, "HoHum">>,
    ];

    const cases: cases = [
      true,true,true,
      true,true,true,true,
      true, true, true,
      true,true,true,true,
      false, false,
      true, true,true,true, true,
      true, true, true, false
    ];
  });
});

describe("ok(), err(), isOk() and other Result runtime utils", () => {

  it.skip("runtime using higher order fn", () => {
    // const {ok, err, result} = asResult("", "oops")

    // type cases = [
    //   ExpectTrue<IsFunction<typeof ok>>,
    //   ExpectTrue<IsFunction<typeof err>>,
    //   Expect<Equal<typeof result, Result<string, "oops">>>,
    // ];
    // const cases: cases = [
    //   true, true, true
    // ];

  });


  it.skip("runtime base happy path", () => {
    // const five = ok(5);
    // const five_n = okN(5);

    // const simple_err = createErr("Oops");
    // const simple = err(simple_err);
    // const asserted_err = assertErr(simple);
    // const err_result: Result<number, "oops"> = err("oops");
    // const ok_result: Result<number, "oops"> = ok(5);

    // const expected = err({
    //   msg: "oops",
    //   kind: "invalid-value",
    //   context: { expected: 5, got: 42 }
    // });


    // if (isOk(ok_result)) {
    //   expect(ok_result.val).toEqual(5);
    // } else {
    //   throw new Error(`ok_result was supposed to have an OK value of 5!`)
    // }

    // type cases = [
    //   Expect<Equal<typeof five, Ok<number>>>,
    //   Expect<Equal<typeof five_n, Ok<5>>>,

    //   ExpectTrue<typeof asserted_err>,

    //   ExpectTrue<IsResult<typeof err_result>>,
    //   ExpectTrue<IsResult<typeof err_result, number, "oops">>,
    //   Expect<Equal<OkFrom<typeof err_result>, number>>,
    //   Expect<Equal<KindFrom<typeof err_result>, Err<"oops">>>,
    //   // string is the wrong value type so this does not pass
    //   ExpectFalse<IsResult<typeof err_result, string>>,

    //   ExpectTrue<IsResult<typeof ok_result, number>>,
    //   ExpectFalse<IsResult<typeof ok_result, string>>,
    //   ExpectTrue<IsResult<typeof ok_result>>,
    //   // we've masked it's value so we'll need to determine at runtime
    //   // whether it's a
    //   ExpectTrue<IsErr<typeof err_result, "oops">>,
    //   // because the error type doesn't match we can determine
    //   // that it is NOT the expected error at design time.
    //   Expect<Equal<IsErr<typeof err_result, "nada">, false>>,
    //   ExpectTrue<IsOk<typeof ok_result>>,


    // ];
    // const cases: cases = [
    //   true, true,
    //   true,
    //   true, true, false,
    //   true, false, true, true,true,
    //   true
    // ];

  });


});



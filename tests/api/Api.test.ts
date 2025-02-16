import { Equal, Expect, ExpectFalse, ExpectTrue } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";
import {
  AsApi,
  Extends,
  GetEscapeFunction,
  IsErrorCondition,
  Api,
  Dictionary,
  IsEscapeFunction,
  HasEscapeFunction,
  AsEscapeFunction,
} from "inferred-types/types";

import {
  asApi,
  asEscapeFunction,
  isApiSurface,
  isEscapeFunction
} from "inferred-types/runtime";


// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("API related type utilities", () => {

  it("Escape Functions", () => {
    type OWith = {
      age: () => number;
      name: () => string;
      done: AsEscapeFunction<() => `done`>;
    };
    type AgeIsEscape = IsEscapeFunction<OWith["age"]>;

    type OWithEscape = GetEscapeFunction<OWith>;
    type OWithout = {
      age: () => number;
      name: () => string;
      done: () => `done`;
    };
    type OWithoutEscape = GetEscapeFunction<OWithout>;

    type Fn = AsEscapeFunction<() => `done`> & { age: 42 };
    type GFn = GetEscapeFunction<Fn>;

    type cases = [
      ExpectFalse<AgeIsEscape>,
      IsErrorCondition<OWithoutEscape, "no-escape-function">,

      ExpectTrue<HasEscapeFunction<OWith>>,
      ExpectFalse<HasEscapeFunction<OWithout>>,
      ExpectTrue<HasEscapeFunction<Fn>>,

      Expect<Equal<
        OWithEscape,
        AsEscapeFunction<() => `done`>
      >>,
      Expect<Equal<
        GFn,
        (() => `done`) & { escape: true } & { age: 42 }
      >>,
    ];
    const cases: cases = [
      false, true,
      true, false, true,
      true, true
    ];

  });

  it("AsApi<TSurface,TOpts>", () => {
    // basics
    type Valid = AsApi<{
      age: () => number;
      greet: <T extends string>(name: T) => `Hi ${T}`;
      done: AsEscapeFunction<() => `done`>;
    }>;

    type Invalid = AsApi<{ age: () => number }>;

    type cases = [
      Extends<Valid, Api>,
      Expect<Equal<Valid["surface"], {
        age: () => number;
        greet: <T extends string>(name: T) => `Hi ${T}`;
        done: AsEscapeFunction<() => `done`>
      }>>,

      IsErrorCondition<Invalid, "no-escape-function">
    ];
    const cases: cases = [
      true, true,
      true
    ];

  });


  it("isApiSurface()", () => {
    const surface = {
      default_values: <T extends Dictionary>(v: T) => v,
      done: asEscapeFunction(() => null)
    };
    const invalid = {
      default_values: <T extends Dictionary>(v: T) => v,
      done: () => null
    };

    expect(isEscapeFunction(surface.done)).toBe(true);
    expect(isApiSurface(surface)).toBe(true);
    expect(isApiSurface(invalid)).toBe(false);

  });

  it("asApi", () => {
    let valid = asApi({
      default_values: <T extends Dictionary>(v: T) => v,
      /** escape function */
      done: asEscapeFunction(() => null)
    });
    let invalid = asApi({
      default_values: <T extends Dictionary>(v: T) => v,
      done: () => null
    });

    expect(isEscapeFunction(asEscapeFunction(() => null))).toBe(true);

    expect(valid._kind).toBe("api");
    expect(typeof valid.surface).toBe("object");

    type cases = [
      Expect<Extends<typeof valid, Api>>,
      IsErrorCondition<typeof invalid, "no-escape-function">
    ];
    const cases: cases = [
      true, true
    ];
  });


  // it("asApiCallback()", () => {
  //   let api = asApi({
  //     default_values: <T extends NarrowObject<N>, N extends Narrowable>(v: T) => v,
  //     done: asEscapeFunction(() => null)
  //   });

  //   type Surface = ApiSurface<typeof api>;
  //   type Return = ApiReturn<typeof api>;
  //   type Callback = ApiCallback<typeof api>;
  //   type Done = GetEscapeFunction<typeof api>;

  //   let cb = asApiCallback(api);
  //   let done = getEscapeFunction(api);

  //   let d1 = done();
  //   let d2 = cb(c => c.done());
  //   let values = cb(c => c.default_values({foo: 1, bar: 2}));

  //   // returned the escape function but didn't call it
  //   let oops1 = cb(c => c.done);
  //   // returned the whole API
  //   let oops2 = cb(c => c);

  //   // unexpected in-use of the API
  //   let unexpected = cb(() => 42);

  //   expect(d1).toBe(null);
  //   expect(d2).toBe(null);
  //   expect(values).toEqual({foo: 1, bar: 2});

  //   expect(typeof oops1).toBe("function");
  //   expect(isEscapeFunction(oops1)).toBe(true);
  //   expect(typeof oops2).toBe("object");
  //   expect(isApiSurface(oops2)).toBe(true);

  //   expect(unexpected).toBe(42);

  //   type cases = [
  //     Expect<Equal<Surface, {
  //       default_values: <T extends NarrowObject<N>, N extends Narrowable>(v: T) => T;
  //       done: (() => null) & {
  //         escape: true;
  //     };
  //     }>>,
  //     Expect<Equal<Done, (() => null) & { escape: true }>>,
  //     Expect<Equal<Return, NarrowObject<Narrowable> | null>>,
  //     Expect<Equal<typeof cb, Callback>>,

  //     Expect<Equal<typeof d1, null>>,
  //     Expect<Equal<typeof d2, null>>,
  //     Expect<Equal<typeof values, { foo: 1; bar: 2 }>>,

  //     Expect<Equal<typeof unexpected, number>>
  //   ];
  //   const cases: cases = [
  //     true, true,true,true,
  //     true, true, true,
  //     true
  //   ];

  // });


  // it("addApiHandler()", () => {
  //   let api = asApi({
  //     default_values: <T extends NarrowObject<N>, N extends Narrowable>(v: T) => v,
  //     done: asEscapeFunction(() => null)
  //   });
  //   /** Handled API */
  //   let cb = asHandledApiCallback(api);




  //   type cases = [
  //     /** type tests */
  //   ];
  //   const cases: cases = [];

  // });




});


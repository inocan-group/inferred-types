import { Equal, Expect } from "@type-challenges/utils";
import { describe, expect, it } from "vitest";

import {
  narrow,
  optional,
  isArray,
  isReadonlyArray,
  hasDefaultValue,
  isDefined,
  isRef,
  isConstant,
  isSpecificConstant,
  defineObj,
  isNumericString,
  DoesExtend
} from "inferred-types";
import {
  Constant,
  NoDefaultValue,
  NO_DEFAULT_VALUE,
  Never
} from "inferred-types";
import { ref, Ref } from "vue";

// Note: while type tests clearly fail visible inspection, they pass from Vitest
// standpoint so always be sure to run `tsc --noEmit` over your test files to
// gain validation that no new type vulnerabilities have cropped up.

describe("isNumericString", () => {

  it("false outcomes", () => {
    const wrongType = 42 as const;
    const nonNumericString = "foobar" as const;

    if(isNumericString(wrongType)) {
      throw new Error("wrong type!");
    } else {
      expect(true, "wrong type identified as such").toBe(true);
    }

    if(isNumericString(nonNumericString)) {
      throw new Error("non numeric string!");
    } else {
      expect(true, "wrong type identified as such").toBe(true);
    }

    type cases = [
      /** type tests */
    ];
    const cases: cases = [];
  });


  it("positive outcomes", () => {
    const numericString = "42" as const;
    const wideString = "42" as string;

    expect(isNumericString(numericString), "numericString variable not recognized:" + typeof numericString).toBe(true);


    if(isNumericString(numericString)) {
      expect(true, "numeric string identified").toBe(true);
      type cases = [
        Expect<Equal<typeof numericString, "42">> //
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("numeric string not identified!");
    }

    if(isNumericString(wideString)) {
      expect(true, "wide string identified").toBe(true);
      type cases = [
        Expect<Equal<typeof numericString, "42">> //
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("wide string not identified");
    }

  });


});

describe("isDefined(value)", () => {

  it("positive outcome", () => {
    const yup = 45 as const;
    const yup2 = 45 as number;

    if(isDefined(yup)) {
      expect(true, "identified with narrow type").toBe(true);
      type cases = [
        Expect<Equal<typeof yup, 45>>
      ];
      const cases: cases = [ true  ];
    } else {
      throw new Error("narrow defined missed");
    }

    if(isDefined(yup2)) {
      expect(true, "identified with wide type").toBe(true);
      type cases = [
        Expect<Equal<typeof yup, 45>>
      ];
      const cases: cases = [ true  ];
    }

  });

});

describe("isRef - testing for VueJS reference types", () => {
  const obj = defineObj({ foo: 1, bar: 2 })();
  const refObj = ref(obj);

  it("positive tests", () => {
    if(isRef(refObj)) {
      expect(true, "identified as ref").toBe(true);
      type R = typeof refObj;
      type cases = [
        Expect<DoesExtend<
          R,
          Ref<{ foo: 1;  bar: 2 }>
        >>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("ref not identified!");
    }

  });


  it("negative tests", () => {
    if(isRef(obj)) {
      throw new Error("false positive for isRef");
    } else {
      expect(true, "rejected value as ref").toBe(true);
    }
  });

});

describe("isArray / isReadonlyArray", () => {
  const foobar = narrow([{foo: 1, bar: 2}]);
  const optFoobar = optional(foobar);

  it("positive tests", () => {
    if(isReadonlyArray(foobar)) {
      expect(true, "identified as readonly array").toBe(true);
      type Foobar = typeof foobar;
      type cases = [
        Expect<Equal<
          Foobar,
          {foo: number; bar: number }[]
        >>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("didn't detect readonly array");
    }

    if(isArray([{foo: 1, bar: 2}])) {
      expect(true, "identified as array").toBe(true);
      type Foobar = typeof foobar;
      type cases = [
        Expect<Equal<
          Foobar,
          {foo: number; bar: number }[]
        >>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("didn't detect array");
    }
  });


  it("positive test of union type", () => {
    if(isReadonlyArray(optFoobar)) {
      expect(true, "identified as readonly array").toBe(true);

      type Foobar = typeof optFoobar;
      type cases = [
        Expect<Equal<
          Foobar,
           {foo: number; bar: number }[]
        >>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("didn't detect readonly array");
    }
  });
});

describe("hasDefaultValue(v)", () => {
  const numeric = 42 as number | NoDefaultValue;
  const noNumeric = NO_DEFAULT_VALUE as number | NoDefaultValue;
  const stringy = "foobar" as string | NoDefaultValue;
  const noStringy = NO_DEFAULT_VALUE as string | NoDefaultValue;

  it("positive tests", () => {
    if(hasDefaultValue(numeric)) {
      expect(true).toBe(true);
      type Val = typeof numeric;
      type cases = [
        Expect<Equal<Val, number>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("numeric should have been identified as a def value");
    }

    if(hasDefaultValue(stringy)) {
      expect(true).toBe(true);
      type cases = [
        Expect<Equal<typeof stringy, string>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("numeric should have been identified as a def value");
    }
  });


  it("negative tests", () => {
    if(hasDefaultValue(noNumeric)) {
      throw new Error(`noNumeric should not have passed`);
    } else {
      expect(true).toBe(true);
      type cases = [
        Expect<Equal<typeof noNumeric, NoDefaultValue>>
      ];
      const cases: cases = [ true ];
    }

    if(hasDefaultValue(noStringy)) {
      throw new Error(`noStringy should not have passed`);
    } else {
      expect(true).toBe(true);
      type cases = [
        Expect<Equal<typeof noNumeric, NoDefaultValue>>
      ];
      const cases: cases = [ true ];
    }
  });
});

describe("isConstant()", () => {
  const maybe = NO_DEFAULT_VALUE as NoDefaultValue | "foobar";
  const notReally = "foobar" as NoDefaultValue | "foobar";

  it("positive test", () => {
    if(isConstant(maybe)) {
      expect(true).toBe(true);
      type cases = [
        Expect<Equal<typeof maybe, Constant<"no-default-value">>>
      ];
      const cases: cases = [ true ];
    }
  });


  it.skip("positive test for Never type", () => {
    // special case because the type system sees as `never` rather than as Constant
    const maybe = Never;

    if(isConstant(maybe)) {
      expect(true).toBe(true);
    } else {
      throw new Error(`Never was not found to be a constant! Value: ${JSON.stringify(maybe)}`);
    }
  });

  it.skip("isSpecificConstant for Never type", () => {
    // special case because the type system sees as `never` rather than as Constant
    const maybe = Never;

    if(isSpecificConstant("never")(maybe)) {
      expect(true).toBe(true);
    } else {
      throw new Error(`Never was not found to be a SpecificConstant<\"never\">! Value: ${JSON.stringify(maybe)}`);
    }
  });


  it("negative test", () => {
    if(isConstant(notReally)) {
      throw new Error("incorrect identification of constant");
    } else {
      expect(true).toBe(true);
      type cases = [
        Expect<Equal<typeof notReally, "foobar">>
      ];
      const cases: cases = [ true ];
    }
  });
});

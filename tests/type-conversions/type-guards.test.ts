import { Equal, Expect } from "@type-challenges/utils";
import { intoSet } from "../../src/runtime/lists/intoSet";
import { Never } from "../../src/runtime/runtime/Never";
import { optional } from "../../src/runtime/type-conversion/optional";
import { 
  isArray, 
  isReadonlyArray,
  hasDefaultValue, 
  isNumericString,
  isDefined,
  isRef 
} from "../../src/runtime/type-guards";
import { isConstant, isSpecificConstant } from "../../src/runtime/type-guards/isConstant";
import { NoDefaultValue, NO_DEFAULT_VALUE } from "../../src/constants";
import { Constant } from "../../src/constants/Constant";
import { describe, expect, it } from "vitest";
import { ref, Ref } from "vue";
import { VueRef } from "src/types";

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

describe("isRef", () => {
  const obj = { foo: 1, bar: 2 } as const;
  const refObj = ref(obj);

  it("positive tests", () => {
    if(isRef(refObj)) {
      expect(true, "identified as ref").toBe(true);
      type R = typeof refObj;
      type cases = [
        Expect<Equal<
          R, 
          VueRef<{readonly foo: 1; readonly bar: 2 }> & 
          Ref<{readonly foo: 1; readonly bar: 2 }>
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
  const foobar = intoSet([{foo: 1, bar: 2}]); 
  const optFoobar = optional(foobar);

  it("positive tests", () => {
    if(isReadonlyArray(foobar)) {
      expect(true, "identified as readonly array").toBe(true);
      type cases = [
        Expect<Equal<typeof foobar, readonly {foo: number; bar: number }[]>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("didn't detect readonly array");
    }

    if(isArray(foobar)) {
      expect(true, "identified as array").toBe(true);
      type cases = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Expect<Equal<typeof foobar, readonly {foo: number; bar: number }[] & any[]>>
      ];
      const cases: cases = [ true ];
    } else {
      throw new Error("didn't detect array");
    }
  });

  
  it("positive test of union type", () => {
    if(isReadonlyArray(optFoobar)) {
      expect(true, "identified as readonly array").toBe(true);
      type cases = [
        Expect<Equal<typeof foobar, readonly {foo: number; bar: number }[]>>
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

  
  it("positive test for Never type", () => {
    // special case because the type system sees as `never` rather than as Constant
    const maybe = Never as string | never;
    
    if(isConstant(maybe)) {
      expect(true).toBe(true);
    } else {
      throw new Error("Never was not found to be a constant!");
    }
  });

  it("isSpecificConstant for Never type", () => {
    // special case because the type system sees as `never` rather than as Constant
    const maybe = Never as string | never;
    
    if(isSpecificConstant("never")(maybe)) {
      expect(true).toBe(true);
    } else {
      throw new Error("Never was not found to be a SpecificConstant<\"never\">!");
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





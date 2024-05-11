import { describe, expect, it } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import {  
  EmptyObject, 
  ExplicitlyEmptyObject, 
  IfLiteral, 
  IsBooleanLiteral, 
  IsLiteral, 
  IsObjectLiteral
} from "src/types/index";

describe("IsObjectLiteral<T>", () => {

  it("happy path", () => {
    // eslint-disable-next-line @typescript-eslint/ban-types

    type cases = [
      // an empty object is still allowed to take on keys after it is
      // defined without error. The type will remain showing as empty
      // but there is no typing error when more characters are added
      Expect<Equal<IsObjectLiteral<EmptyObject>, false>>, 
      // when we explicitly strip out the index keys then this 
      // becomes an explicit literal type with zero keys
      Expect<Equal<IsObjectLiteral<ExplicitlyEmptyObject>, true>>, 
      Expect<Equal<IsObjectLiteral<{ foo: 1; bar: 2 }>, true>>, 
      Expect<Equal<IsObjectLiteral<object>, false>>,
      Expect<Equal<IsObjectLiteral<Record<string, unknown>>, false>>, 
    ];
    const cases: cases = [ true, true, true, true, true ];
  });
});


describe("IsLiteral<T> type utility", () => {
  it("string values", () => {
    const s = "hi" as string;
    const sl = "hi" as const;

    type cases = [
      Expect<Equal<IsLiteral<typeof s>, false>>,
      Expect<Equal<IsLiteral<typeof sl>, true>>
    ];
    const cases: cases = [true, true];
    expect(typeof s).toBe("string");
    expect(typeof sl).toBe("string");
  });

  it("numeric values", () => {
    const v = 42 as number;
    const vl = 42 as const;

    type cases = [
      Expect<Equal<IsLiteral<typeof v>, false>>,
      Expect<Equal<IsLiteral<typeof vl>, true>>
    ];
    const cases: cases = [true, true];

    expect(typeof v).toBe("number");
    expect(typeof vl).toBe("number");
  });

  it("boolean values", () => {
    type cases = [
      // wide
      Expect<Equal<IsBooleanLiteral<boolean>, false>>,
      Expect<Equal<IsLiteral<boolean>, false>>,
      // literal
      Expect<Equal<IsBooleanLiteral<false>, true>>,
      Expect<Equal<IsLiteral<false>, true>>
    ];
    const cases: cases = [true, true, true, true];
  });

  it("union with undefined", () => {
    const vb = true as true | undefined;
    const vs = "foo" as "foo" | undefined;
    const vn = 42 as 42 | undefined;

    type cases = [
      Expect<Equal<IsLiteral<Exclude<typeof vb, undefined>>, true>>, //
      Expect<Equal<IsLiteral<Exclude<typeof vs, undefined>>, true>>, //
      Expect<Equal<IsLiteral<Exclude<typeof vn, undefined>>, true>>, //
    ];
    const cases: cases = [true, true, true];
  });

  
  it("arrays", () => {
    type StringArr = IsLiteral<string[]>;
    type NumericArr = IsLiteral<number[]>;
    type UnionArr = IsLiteral<(string | number)[]>;
    type StringTuple = IsLiteral<["foo", "bar", "baz"]>;
    type RO_StringTuple = IsLiteral<readonly ["foo", "bar", "baz"]>;
    type TupleWithWide = IsLiteral<["foo", "bar", "baz", number, string]>;
    type TupleWithWide_RO = IsLiteral<["foo", "bar", "baz", number, string]>;
    type TupleOnlyWide = IsLiteral<[number, string, number]>;
    
    
    type cases = [
      Expect<Equal<StringArr, false>>,
      Expect<Equal<NumericArr, false>>,
      Expect<Equal<UnionArr, false>>,
      Expect<Equal<StringTuple, true>>,
      Expect<Equal<RO_StringTuple, true>>,
      Expect<Equal<TupleWithWide, true>>,
      Expect<Equal<TupleWithWide_RO, true>>,
      Expect<Equal<TupleOnlyWide, true>>,
    ];
    const cases: cases = [ true, true, true, true, true, true, true, true ];
    
  });

  
  it("objects", () => {
    type GenericString = IsLiteral<Record<string, string>>;
    type GenericUnion = IsLiteral<Record<string, string | number>>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    type Empty = IsLiteral<{}>;
    type Loose = IsLiteral<object>;
    type Keyed = IsLiteral<{ foo: 1 }>;
    
    type cases = [
      Expect<Equal<IsLiteral<Record<string, unknown>>, false>>,
      Expect<Equal<GenericString, false>>,
      Expect<Equal<GenericUnion, false>>,
      Expect<Equal<Empty, false>>,
      Expect<Equal<Loose, false>>,
      Expect<Equal<Keyed, true>>,
    ];
    const cases: cases = [ true, true, true, true, true, true ];
    
  });
  
  
});

describe("IfLiteral<T,IF,ELSE,MAYBE>", () => {

  it("happy-path", () => {
    type T1 = IfLiteral<"foo", true, false>;
    type T2 = IfLiteral<true, true, false>;
    type T3 = IfLiteral<false, true, false>;
    type T4 = IfLiteral<42, true, false>;

    type F1 = IfLiteral<string, true, false>;
    type F2 = IfLiteral<boolean, true, false>;
    type F3 = IfLiteral<number, true, false>;

    type cases = [
      //
      Expect<Equal<T1, true>>,
      Expect<Equal<T2, true>>,
      Expect<Equal<T3, true>>,
      Expect<Equal<T4, true>>,
      Expect<Equal<F1, false>>,
      Expect<Equal<F2, false>>,
      Expect<Equal<F3, false>>,
    ];
    
    const cases: cases = [ true, true, true, true, true, true, true ];

  });

});

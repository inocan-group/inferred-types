import { Expect, EmptyObject, RemoveNever, Test } from "inferred-types/types";
import { describe, it } from "vitest";

describe("RemoveNever<T>", () => {

  it("tuple tests", () => {
    type Identity = RemoveNever<[1, 2, 3]>;
    type OneGone = RemoveNever<[1, never, 2, 3]>;
    type AllGone = RemoveNever<[never, never]>;
    type Leading = RemoveNever<[never, 1, 2, 3]>;
    type Tailing = RemoveNever<[1, 2, 3, never]>;

    type cases = [
      Expect<Test<Identity, "equals", [1, 2,  3]>>,
      Expect<Test<OneGone, "equals", [1, 2,  3]>>,
      Expect<Test<AllGone, "equals", []>>,
      Expect<Test<Leading, "equals", [1, 2,  3]>>,
      Expect<Test<Tailing, "equals", [1, 2,  3]>>,
    ];

  });

  it("object tests", () => {
    type Identity = RemoveNever<{ foo: 1 }>;
    type NoBar = RemoveNever<{ foo: 1; bar: never }>;
    type NothingLeft = RemoveNever<{ foo: never; bar: never }>;
    type NothingToBegin = RemoveNever<EmptyObject>;

    type cases = [
      Expect<Test<Identity, "equals",  { foo: 1 }>>,
      Expect<Test<NoBar, "equals",  { foo: 1 }>>,
      Expect<Test<NothingLeft, "equals",  EmptyObject>>,
      Expect<Test<NothingToBegin, "equals",  EmptyObject>>,
    ];

  });

  describe("Tuple edge cases", () => {
    it("empty tuple", () => {
      type Empty = RemoveNever<[]>;
      type cases = [
        Expect<Test<Empty, "equals", []>>,
      ];
    });

    it("single element cases", () => {
      type SingleNever = RemoveNever<[never]>;
      type SingleValue = RemoveNever<[42]>;

      type cases = [
        Expect<Test<SingleNever, "equals", []>>,
        Expect<Test<SingleValue, "equals", [42]>>,
      ];
    });

    it("mixed types with never", () => {
      type Mixed = RemoveNever<[string, never, number, never, boolean, never, symbol]>;
      type cases = [
        Expect<Test<Mixed, "equals", [string, number, boolean, symbol]>>,
      ];
    });

    it("nested tuples (inner never preserved)", () => {
      type Nested = RemoveNever<[[1, never, 2], never, [never, 3], []]>;
      type cases = [
        Expect<Test<Nested, "equals", [[1, never, 2], [never, 3], []]>>,
      ];
    });

    it("long tuple with never values", () => {
      type LongTuple = RemoveNever<[
        1, never, 2, never, 3, never, 4, never, 5,
        never, 6, never, 7, never, 8, never, 9, never, 10
      ]>;
      type cases = [
        Expect<Test<LongTuple, "equals", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>>,
      ];
    });

    it("consecutive never values", () => {
      type ConsecutiveNever = RemoveNever<[1, never, never, never, 2, never, never, 3]>;
      type cases = [
        Expect<Test<ConsecutiveNever, "equals", [1, 2, 3]>>,
      ];
    });

    it("union types with never (preserved as-is)", () => {
      type WithUnions = RemoveNever<[string | never, never, number | string, never | boolean]>;
      type cases = [
        Expect<Test<WithUnions, "equals", [string | never, number | string, never | boolean]>>,
      ];
    });

    it("undefined and null preservation", () => {
      type WithNulls = RemoveNever<[undefined, never, null, never, void]>;
      type cases = [
        Expect<Test<WithNulls, "equals", [undefined, null, void]>>,
      ];
    });
  });

  describe("Object edge cases", () => {
    it("numeric and symbol keys", () => {
      type NumericKeys = RemoveNever<{ 0: string; 1: never; 2: number; 3: never }>;
      type cases = [
        Expect<Test<NumericKeys, "equals", { 0: string; 2: number }>>,
      ];
    });

    it("optional properties", () => {
      type WithOptional = RemoveNever<{
        required: string;
        optional?: never;
        alsoOptional?: number;
        neverRequired: never
      }>;
      type cases = [
        Expect<Test<WithOptional, "equals", { required: string; alsoOptional?: number }>>,
      ];
    });

    it("deeply nested objects (inner never preserved)", () => {
      type DeepNested = RemoveNever<{
        a: { x: never; y: string };
        b: never;
        c: { nested: { deep: never; keep: number } };
        d: string;
      }>;
      type cases = [
        Expect<Test<DeepNested, "equals", {
          a: { y: string };
          c: { nested: { keep: number } };
          d: string;
        }>>,
      ];
    });

    it("union types in objects (preserved as-is)", () => {
      type WithUnions = RemoveNever<{
        a: string | never;
        b: never;
        c: number | string;
        d: never | boolean;
      }>;
      type cases = [
        Expect<Test<WithUnions, "equals", {
          a: string | never;
          c: number | string;
          d: never | boolean;
        }>>,
      ];
    });

    it("function and array properties", () => {
      type WithFunctionsAndArrays = RemoveNever<{
        fn1: () => void;
        fn2: never;
        arr1: string[];
        arr2: never;
        arr3: never[];
      }>;
      type cases = [
        Expect<Test<WithFunctionsAndArrays, "equals", {
          fn1: () => void;
          arr1: string[];
          arr3: never[];
        }>>,
      ];
    });

    it("readonly properties", () => {
      type WithReadonly = RemoveNever<{
        readonly a: string;
        b: never;
        readonly c: number;
      }>;
      type cases = [
        Expect<Test<WithReadonly, "equals", {
          readonly a: string;
          readonly c: number;
        }>>,
      ];
    });
  });

  describe("Complex combinations", () => {
    it("object containing tuples", () => {
      type ObjectWithTuples = RemoveNever<{
        tuple1: [string, never, number];
        remove: never;
        tuple2: [never, never];
        keep: boolean;
      }>;
      type cases = [
        Expect<Test<ObjectWithTuples, "equals", {
          tuple1: [string, never, number];
          tuple2: [never, never];
          keep: boolean;
        }>>,
      ];
    });

    it("tuple containing objects", () => {
      type TupleWithObjects = RemoveNever<[
        { a: string; b: never },
        never,
        { c: never; d: never },
        { e: number }
      ]>;
      type cases = [
        Expect<Test<TupleWithObjects, "equals", [
          { a: string; b: never },
          { c: never; d: never },
          { e: number }
        ]>>,
      ];
    });

    it("complex nested structure", () => {
      type Input = {
        level1: {
          tupleInObject: [string, never, number];
          remove: never;
          keep: {
            deeper: [never, boolean, never];
          };
        };
        removeThis: never;
        topLevelTuple: [never, { nested: never; keep: string }, never];
      };

      type Complex = RemoveNever<Input>;

      // Test key presence
      type HasLevel1 = "level1" extends keyof Complex ? true : false;
      type HasRemoveThis = "removeThis" extends keyof Complex ? true : false;
      type HasTopLevelTuple = "topLevelTuple" extends keyof Complex ? true : false;

      type cases = [
        Expect<Test<HasLevel1, "equals", true>>,
        Expect<Test<HasRemoveThis, "equals", false>>,
        Expect<Test<HasTopLevelTuple, "equals", true>>,
      ];
    });
  });

  describe("Type preservation", () => {
    it("literal types", () => {
      type Literals = RemoveNever<{
        str: "exact";
        num: 42;
        bool: true;
        remove: never;
      }>;
      type cases = [
        Expect<Test<Literals, "equals", {
          str: "exact";
          num: 42;
          bool: true;
        }>>,
      ];
    });

    it("template literal types", () => {
      type Templates = RemoveNever<{
        template: `hello-${string}`;
        remove: never;
        another: `${number}-world`;
      }>;
      type cases = [
        Expect<Test<Templates, "equals", {
          template: `hello-${string}`;
          another: `${number}-world`;
        }>>,
      ];
    });

    it("conditional types", () => {
      type Conditional<T> = T extends string ? T : never;
      type WithConditional = RemoveNever<{
        cond1: Conditional<"hello">;
        cond2: Conditional<number>;
        remove: never;
      }>;
      type cases = [
        Expect<Test<WithConditional, "equals", {
          cond1: "hello";
        }>>,
      ];
    });
  });

  describe("Stress tests", () => {
    it("large tuple", () => {
      type LargeTuple = RemoveNever<[
        1, never, 2, never, 3, never, 4, never, 5, never,
        6, never, 7, never, 8, never, 9, never, 10, never,
        11, never, 12, never, 13, never, 14, never, 15, never,
        16, never, 17, never, 18, never, 19, never, 20
      ]>;
      type cases = [
        Expect<Test<LargeTuple, "equals", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]>>,
      ];
    });

    it("large object", () => {
      type LargeObject = RemoveNever<{
        a1: string; a2: never; a3: number; a4: never; a5: boolean;
        b1: never; b2: string; b3: never; b4: number; b5: never;
        c1: boolean; c2: never; c3: string; c4: never; c5: number;
        d1: never; d2: boolean; d3: never; d4: string; d5: never;
      }>;
      type cases = [
        Expect<Test<LargeObject, "equals", {
          a1: string; a3: number; a5: boolean;
          b2: string; b4: number;
          c1: boolean; c3: string; c5: number;
          d2: boolean; d4: string;
        }>>,
      ];
    });

    it("alternating pattern", () => {
      type AlternatingPattern = RemoveNever<[
        "a", never, "b", never, "c", never, "d", never, "e", never,
        "f", never, "g", never, "h", never, "i", never, "j"
      ]>;
      type cases = [
        Expect<Test<AlternatingPattern, "equals", ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]>>,
      ];
    });
  });
});

import { describe, expect, it } from "vitest";
import type { AssertEqual, AssertSameValues, Expect, Unique } from "inferred-types/types";
import { unique } from "inferred-types/runtime";

// =============================================================================
// PHASE 1: TYPE TESTS - Unique<T> without deref
// =============================================================================

describe("Unique<T> - Type Tests", () => {
  describe("primitive values without deref", () => {

    it("should handle empty array", () => {
      type T = Unique<[]>;

      type cases = [
        Expect<AssertEqual<T, []>>
      ];
    });

    it("should handle single element", () => {
      type T1 = Unique<[1]>;
      type T2 = Unique<["foo"]>;
      type T3 = Unique<[true]>;

      type cases = [
        Expect<AssertEqual<T1, [1]>>,
        Expect<AssertEqual<T2, ["foo"]>>,
        Expect<AssertEqual<T3, [true]>>
      ];
    });

    it("should handle all duplicates", () => {
      type T1 = Unique<[1, 1, 1, 1]>;
      type T2 = Unique<["a", "a", "a"]>;

      type cases = [
        Expect<AssertEqual<T1, [1]>>,
        Expect<AssertEqual<T2, ["a"]>>
      ];
    });

    it("should deduplicate numeric literals", () => {
      type T0 = Unique<[2, 3, 2, 1]>;
      type T1 = Unique<[1, 2, 3, 4, 3, 4, 5, 6]>;

      type cases = [
        Expect<AssertSameValues<T0, [2, 3, 1]>>,
        Expect<AssertSameValues<T1, [1, 2, 3, 4, 5, 6]>>
      ];
    });

    it("should deduplicate string literals", () => {
      type T1 = Unique<["foo", "bar", "foo", "baz"]>;
      type T2 = Unique<["a", "b", "c", "a", "b"]>;

      type cases = [
        Expect<AssertSameValues<T1, ["foo", "bar", "baz"]>>,
        Expect<AssertSameValues<T2, ["a", "b", "c"]>>
      ];
    });

    it("should deduplicate boolean literals", () => {
      type T1 = Unique<[true, false, true, false, true]>;
      type T2 = Unique<[false, false]>;

      type cases = [
        Expect<AssertSameValues<T1, [true, false]>>,
        Expect<AssertEqual<T2, [false]>>
      ];
    });

    it("should handle mixed primitive types", () => {
      type T = Unique<[1, "a", 2, "a", 1, true, false, 1, "b", true]>;

      type cases = [
        Expect<AssertSameValues<T, [1, "a", 2, true, false, "b"]>>
      ];
    });

    it("should deduplicate object types (full type signature comparison)", () => {
      type Obj1 = { id: 1; bar: 2 };
      type Obj2 = { id: 2; bar: 10 };
      type Obj3 = { id: 3; bar: 20 };

      type T3 = Unique<[Obj1, Obj2, Obj2, Obj3]>;

      type cases = [
        Expect<AssertEqual<T3, [Obj1, Obj2, Obj3]>>
      ];
    });
  });
});

// =============================================================================
// PHASE 1.2: TYPE TESTS - Unique<T, TDeref> with deref
// =============================================================================

describe("Unique<T, TDeref> - Type Tests with Deref", () => {

  it("should deduplicate objects by id property", () => {
    type Obj1 = { id: 1; name: "Alice" };
    type Obj2 = { id: 2; name: "Bob" };
    type Obj3 = { id: 1; name: "Alice Clone" }; // Same id as Obj1

    type T = Unique<[Obj1, Obj2, Obj3], "id">;

    type cases = [
      // Should keep first occurrence when id matches
      Expect<AssertEqual<T, [Obj1, Obj2]>>
    ];
  });

  it("should deduplicate by numeric property", () => {
    type Item1 = { index: 0; value: "a" };
    type Item2 = { index: 1; value: "b" };
    type Item3 = { index: 0; value: "c" }; // Duplicate index

    type T = Unique<[Item1, Item2, Item3], "index">;

    type cases = [
      Expect<AssertEqual<T, [Item1, Item2]>>
    ];
  });

  it("should handle empty array with deref", () => {
    type T = Unique<[], "id">;

    type cases = [
      Expect<AssertEqual<T, []>>
    ];
  });

  it("should handle single object with deref", () => {
    type Obj = { id: 1; name: "Solo" };
    type T = Unique<[Obj], "id">;

    type cases = [
      Expect<AssertEqual<T, [Obj]>>
    ];
  });

  it("should handle all objects with same deref value", () => {
    type Obj1 = { id: 1; name: "A" };
    type Obj2 = { id: 1; name: "B" };
    type Obj3 = { id: 1; name: "C" };

    type T = Unique<[Obj1, Obj2, Obj3], "id">;

    type cases = [
      Expect<AssertEqual<T, [Obj1]>>
    ];
  });

  it("should handle objects with different property types at deref", () => {
    type Obj1 = { key: "a"; value: 1 };
    type Obj2 = { key: "b"; value: 2 };
    type Obj3 = { key: "a"; value: 3 }; // Duplicate key

    type T = Unique<[Obj1, Obj2, Obj3], "key">;

    type cases = [
      Expect<AssertEqual<T, [Obj1, Obj2]>>
    ];
  });
});

// =============================================================================
// PHASE 2.1: RUNTIME TESTS - Primitives (Current Functionality)
// =============================================================================

describe("unique(...) - Runtime Tests", () => {
  describe("primitive deduplication", () => {

    it("should handle empty input", () => {
      const result = unique();

      expect(result).toEqual([]);

      type cases = [
        Expect<AssertEqual<typeof result, []>>
      ];
    });

    it("should handle single value", () => {
      const r1 = unique(1);
      const r2 = unique("foo");
      const r3 = unique(true);

      expect(r1).toEqual([1]);
      expect(r2).toEqual(["foo"]);
      expect(r3).toEqual([true]);

      type cases = [
        Expect<AssertEqual<typeof r1, [1]>>,
        Expect<AssertEqual<typeof r2, ["foo"]>>,
        Expect<AssertEqual<typeof r3, [true]>>
      ];
    });

    it("should handle all duplicates", () => {
      const r1 = unique(1, 1, 1, 1);
      const r2 = unique("a", "a", "a");

      expect(r1).toEqual([1]);
      expect(r2).toEqual(["a"]);

      type cases = [
        Expect<AssertEqual<typeof r1, [1]>>,
        Expect<AssertEqual<typeof r2, ["a"]>>
      ];
    });

    it("should deduplicate numeric values", () => {
      const result = unique(1, 2, 3, 4, 4, 5, 6, 6, 8);

      expect(result).toEqual([1, 2, 3, 4, 5, 6, 8]);

      type cases = [
        Expect<AssertSameValues<typeof result, [1, 2, 3, 4, 5, 6, 8]>>
      ];
    });

    it("should deduplicate string values", () => {
      const result = unique("foo", "bar", "foo", "baz", "bar");

      expect(result).toEqual(["foo", "bar", "baz"]);

      type cases = [
        Expect<AssertSameValues<typeof result, ["foo", "bar", "baz"]>>
      ];
    });

    it("should deduplicate boolean values", () => {
      const result = unique(true, false, true, false, true);

      expect(result).toEqual([true, false]);

      type cases = [
        Expect<AssertSameValues<typeof result, [true, false]>>
      ];
    });

    it("should handle mixed primitive types", () => {
      const result = unique(1, "a", 2, "a", 1, true, false, 1);

      expect(result).toEqual([1, "a", 2, true, false]);

      type cases = [
        Expect<AssertSameValues<typeof result, [1, "a", 2, true, false]>>
      ];
    });

    it("should handle large arrays", () => {
      const input = Array.from({ length: 1000 }, (_, i) => i % 100);
      const result = unique(...input);

      expect(result).toHaveLength(100);
      expect(new Set(result).size).toBe(100);
    });
  });
});

// =============================================================================
// PHASE 2.2: RUNTIME TESTS - Objects (Document Current Limitations)
// =============================================================================

describe("unique(...) - Object Deduplication (Current Behavior)", () => {

  it("KNOWN ISSUE: cannot deduplicate plain objects (reference equality)", () => {
    const obj1 = { id: 1, name: "Alice" };
    const obj2 = { id: 2, name: "Bob" };
    const obj3 = { id: 1, name: "Alice" }; // Same content as obj1, different reference

    const result = unique(obj1, obj2, obj3);

    // Currently keeps all 3 because they're different references
    expect(result).toEqual([obj1, obj2, obj3]);
    expect(result).toHaveLength(3);
  });

  it("does deduplicate same object reference", () => {
    const obj1 = { id: 1, name: "Alice" };
    const obj2 = { id: 2, name: "Bob" };

    const result = unique(obj1, obj2, obj1, obj1);

    // Should only keep 2 unique references
    expect(result).toEqual([obj1, obj2]);
    expect(result).toHaveLength(2);
  });
});


describe("unique.by(deref, ...) - Enhanced with Deref", () => {

  it("should deduplicate objects by id property", () => {
    const obj1 = { id: 1, name: "Alice" } as const;
    const obj2 = { id: 2, name: "Bob" } as const;
    const obj3 = { id: 1, name: "Alice Clone" } as const;

    const result = unique.by("id", obj1, obj2, obj3);

    expect(result).toEqual([obj1, obj2]);
    expect(result).toHaveLength(2);

    type cases = [
      Expect<AssertEqual<typeof result, [typeof obj1, typeof obj2]>>
    ];
  });

  it("should deduplicate by numeric index property", () => {
    const items = [
      { index: 0, value: "a" },
      { index: 1, value: "b" },
      { index: 0, value: "c" }
    ] as const;

    const result = unique.by("index", ...items);

    expect(result).toEqual([items[0], items[1]]);
    expect(result).toHaveLength(2);
  });

  it("should deduplicate by string key property", () => {
    const items = [
      { key: "alpha", data: 1 },
      { key: "beta", data: 2 },
      { key: "alpha", data: 3 }
    ] as const;

    const result = unique.by("key", ...items);

    expect(result).toEqual([items[0], items[1]]);
  });

  it("should handle empty input with deref", () => {
    const result = unique.by("id");

    expect(result).toEqual([]);
  });

  it("should handle single object with deref", () => {
    const obj = { id: 1, name: "Solo" };
    const result = unique.by("id", obj);

    expect(result).toEqual([obj]);
  });

  it("should keep first occurrence when deref values match", () => {
    const obj1 = { id: 1, value: "first" };
    const obj2 = { id: 1, value: "second" };
    const obj3 = { id: 1, value: "third" };

    const result = unique.by("id", obj1, obj2, obj3);

    expect(result).toEqual([obj1]);
    expect(result[0].value).toBe("first");
  });

  it("should handle mixed objects with some matching deref values", () => {
    const items = [
      { category: "A", item: 1 },
      { category: "B", item: 2 },
      { category: "A", item: 3 },
      { category: "C", item: 4 },
      { category: "B", item: 5 }
    ];

    const result = unique.by("category", ...items);

    expect(result).toEqual([items[0], items[1], items[3]]);
    expect(result).toHaveLength(3);
  });
});

// =============================================================================
// PHASE 4: EDGE CASES & ERROR HANDLING
// =============================================================================

describe("unique(...) - Edge Cases", () => {

  it("should handle null values", () => {
    const result = unique(null, null, 1, null, 2);

    expect(result).toEqual([null, 1, 2]);
  });

  it("should handle undefined values", () => {
    const result = unique(undefined, 1, undefined, 2);

    expect(result).toEqual([undefined, 1, 2]);
  });

  it("should handle NaN values correctly", () => {
    const result = unique(NaN, 1, NaN, 2);

    // NaN should be deduplicated properly (runtime validation only)
    expect(result).toHaveLength(3);
    expect((result as any)[0]).toBeNaN();
    expect((result as any)[1]).toBe(1);
    expect((result as any)[2]).toBe(2);

    // Note: Type narrowing for NaN is limited since NaN is typed as 'number'
    // The Unique type sees [number, 1, number, 2] and deduplicates to [number, 1, 2]
    // This is correct type behavior - runtime handles NaN correctly even though types can't express it
    // Using 'as any' for runtime testing since TypeScript can't distinguish NaN from number
  });

  it("should handle array values (by reference)", () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const arr3 = [1, 2]; // Different reference, same content

    const result = unique(arr1, arr2, arr1, arr3);

    // Reference equality for arrays
    expect(result).toEqual([arr1, arr2, arr3]);
  });

  it("should handle Symbol values", () => {
    const sym1 = Symbol("test");
    const sym2 = Symbol("test");

    const result = unique(sym1, sym2, sym1);

    expect(result).toEqual([sym1, sym2]);
  });

  it("should handle objects where deref value is undefined", () => {
    const obj1 = { id: 1, optional: undefined };
    const obj2 = { id: 2, optional: undefined };
    const obj3 = { id: 3, optional: "value" };

    const result = unique.by("optional", obj1, obj2, obj3);

    // Should deduplicate the two with undefined
    expect(result).toEqual([obj1, obj3]);
  });

  it("should handle objects where deref value is null", () => {
    const obj1 = { id: 1, status: null };
    const obj2 = { id: 2, status: null };
    const obj3 = { id: 3, status: "active" };

    const result = unique.by("status", obj1, obj2, obj3);

    // Should deduplicate the two with null
    expect(result).toEqual([obj1, obj3]);
  });
});

// =============================================================================
// PHASE 5: PERFORMANCE & INTEGRATION TESTS
// =============================================================================

describe("unique(...) - Performance & Integration", () => {

  it("should handle very large primitive arrays efficiently", () => {
    const input = Array.from({ length: 10000 }, (_, i) => i % 1000);
    const start = performance.now();
    const result = unique(...input);
    const duration = performance.now() - start;

    expect(result).toHaveLength(1000);
    expect(duration).toBeLessThan(100); // Should complete in <100ms
  });

  it("should handle large object arrays with deref efficiently", () => {
    const input = Array.from({ length: 5000 }, (_, i) => ({
      id: i % 500,
      data: Math.random()
    }));

    const start = performance.now();
    const result = unique.by("id", ...input);
    const duration = performance.now() - start;

    expect(result).toHaveLength(500);
    expect(duration).toBeLessThan(200);
  });

  it("should maintain type narrowing with const assertions", () => {
    const values = [1, 2, 3, 2, 1] as const;
    const result = unique(...values);

    expect(result).toEqual([1, 2, 3]);

    type cases = [
      Expect<AssertSameValues<typeof result, [1, 2, 3]>>
    ];
  });

  it("should work with tuple spreads", () => {
    const tuple1 = [1, 2, 3] as const;
    const tuple2 = [3, 4, 5] as const;

    const result = unique(...tuple1, ...tuple2);

    expect(result).toEqual([1, 2, 3, 4, 5]);

    type cases = [
      Expect<AssertSameValues<typeof result, [1, 2, 3, 4, 5]>>
    ];
  });

  it("should work with mixed object and primitive deduplication", () => {
    const items = [
      { type: "a", value: 1 },
      { type: "b", value: 2 },
      { type: "a", value: 3 },
    ] as const;

    const result = unique.by("type", ...items);

    expect(result).toHaveLength(2);
    expect(result[0].value).toBe(1);
    expect(result[1].value).toBe(2);
  });
});

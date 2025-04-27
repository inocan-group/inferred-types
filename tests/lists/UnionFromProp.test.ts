import { describe, it } from "vitest";
import type { Expect, Test, UnionFromProp } from "inferred-types/types";

const narrow_data = [
    { id: 123, color: "blue" },
    { id: 456, color: "red" },
] as const;
type NarrowData = typeof narrow_data;

type R = { id: number; color: string };
const wide_data: readonly R[] = [
    { id: 123, color: "blue" },
    { id: 456, color: "red" },
];
type WideData = typeof wide_data;

type R2<T extends string> = Readonly<{ id: number; color: T }>;

const hybrid = <H extends R2<any>>(...data: H[]): readonly H[] => data;
const hybrid_data = hybrid(
    ...[
        { id: 123, color: "blue" },
        { id: 456, color: "red" },
    ]
);
type HybridData = typeof hybrid_data;

describe("UniqueForProp<T, P>", () => {
    it("narrow data works as expected", () => {
        type U = UnionFromProp<NarrowData, "id">;

        type cases = [
            // the expected keys are part of the union
            Expect<Test<U, "equals",  123 | 456>>
        ];
    });

    it("wide data only knows the wide type", () => {
        type U = UnionFromProp<WideData, "id">;

        type cases = [
            // the keys are rolled up the wide type
            Expect<Test<U, "equals",  number>>
        ];
    });

    it("wide data only knows the wide type", () => {
        type U = UnionFromProp<HybridData, "id">;
        type cases = [Expect<Test<U, "equals",  number>>];
    });
});

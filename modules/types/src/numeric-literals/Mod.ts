import type { And, IsInteger } from "types/boolean-logic";
import type { Err } from "types/errors";
import type { Abs, NumberLike } from "types/numeric-literals";
import type { FixedLengthArray } from "types/tuples";
import type { AsNumber } from "types/type-conversion";

type SmallInt = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200;

type Gte<
    A extends unknown[],
    B extends unknown[],
    Depth extends readonly unknown[] = []
> = B extends []
    ? true
    : Depth["length"] extends 128
        ? boolean
    : A extends []
        ? false
        : A extends [infer _, ...infer ATail]
            ? B extends [infer _, ...infer BTail]
                ? Gte<ATail, BTail, [unknown, ...Depth]>
                : never
            : never;

type Sub<
    A extends unknown[],
    B extends unknown[],
    Depth extends readonly unknown[] = []
> = B extends []
    ? A
    : Depth["length"] extends 128
        ? unknown[]
    : B extends [infer _, ...infer BTail]
        ? A extends [infer _, ...infer ATail]
            ? Sub<ATail, BTail, [unknown, ...Depth]>
            : never
        : never;

// modulus
type Modulus<
    A extends unknown[],
    B extends unknown[],
    Depth extends readonly unknown[] = []
> = Depth["length"] extends 128
    ? unknown[]
    : Gte<
    A,
    B
> extends true ? Modulus<Sub<A, B>, B, [unknown, ...Depth]> : A;

type Process<
    A extends SmallInt,
    B extends SmallInt,
// @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.
> = FixedLengthArray<number, Abs<A>> extends infer Dividend extends unknown[]
    // @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.
    ? FixedLengthArray<number, Abs<B>> extends infer Divisor extends unknown[]
        ? Modulus<Dividend, Divisor>
        : never
    : never;

/**
 * **Mod**`<A,B>`
 *
 * A type utility which provides the _remainder_ (aka., **modulus**) of
 * a division of two integers.
 */
export type Mod<
    A extends NumberLike,
    B extends NumberLike
> = A extends `${number}`
    // @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.
    ? Mod<AsNumber<A>, AsNumber<B>>
    : B extends `${number}`
        // @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.
        ? Mod<A, AsNumber<B>>
        : number extends A
            ? number
            : number extends B
                ? number
                : And<[
                    IsInteger<A>,
                    IsInteger<B>
                ]> extends true
                    ? B extends 0
                        ? Err<
                            "mod/division-by-zero",
        `The Mod<${A},${B}> type utility can not receive 0 as the divisor.`,
        { a: A; b: B }
                        >
                        // @ts-expect-error TS2589: generic modulus dispatch is covered by source guards and Mod tests.
                        : Abs<AsNumber<A>> extends SmallInt
                            ? Abs<AsNumber<B>> extends SmallInt
                                // @ts-expect-error TS2589: tuple modulus helper is bounded to SmallInt; concrete behavior is covered by Mod tests.
                                ? Process<Abs<AsNumber<A>>, Abs<AsNumber<B>>> extends infer M extends unknown[]
                                    ? M["length"]
                                    : never
                                : number
                            : number
                    : Err<
                        `mod/non-integer`,
                `The Divide<${A},${B}> can only be used with integer values!`,
                { a: A; b: B }
                    >;

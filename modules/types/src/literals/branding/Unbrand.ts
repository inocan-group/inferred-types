import type { Brand } from "./Brand";
import type { BrandSymbol } from "./BrandSymbol";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type ValidTwoDigitMonth = `0${Exclude<Digit, "0">}` | `1${"0" | "1" | "2"}`;
type ValidTwoDigitDate =
    | `0${Exclude<Digit, "0">}`
    | `1${Digit}`
    | `2${Digit}`
    | `3${"0" | "1"}`;

type UnbrandTwoDigitMonth<T> = {
    [M in ValidTwoDigitMonth]: T extends Brand<M, "TwoDigitMonth"> ? M : never
}[ValidTwoDigitMonth];

type UnbrandTwoDigitDate<T> = {
    [D in ValidTwoDigitDate]: T extends Brand<D, "TwoDigitDate"> ? D : never
}[ValidTwoDigitDate];

/**
 * **Unbrand**`<T>`
 *
 * Removes branding from a branded type, returning the original base type.
 *
 * Note: This utility has a known limitation with intersection types.
 * When a branded type is intersected with a literal (e.g., `Brand<string, "Kind"> & "literal"`),
 * TypeScript creates a composite type that cannot be decomposed to extract just the literal.
 * This is a fundamental TypeScript limitation.
 *
 * @example
 *
 * ```ts
 * // string & { [Brand Symbol]: "UserId" }
 * type Branded = Brand<string, "UserId">;
 * type Unbranded = Unbrand<Branded>; // string
 * ```
 */
export type Unbrand<T> = T extends `${infer A extends Digit}${infer B extends Digit}${infer C extends Digit}${infer D extends Digit}` & { [BrandSymbol]: "FourDigitYear" }
    ? `${A}${B}${C}${D}`
    : T extends { [BrandSymbol]: "TwoDigitMonth" }
        ? UnbrandTwoDigitMonth<T>
        : T extends { [BrandSymbol]: "TwoDigitDate" }
            ? UnbrandTwoDigitDate<T>
            : T extends Brand<infer B extends string, any>
                ? B
                : T;

import type {
    Opt,
    TwColor,
    TwColorOptionalOpacity,
    TwColorTarget,
    TwColorWithLuminosity,
    TwColorWithLuminosityOpacity,
    TwModifier,
    TwTarget__Color,
    TwTarget__Color__Light,
} from "inferred-types/types";
import {
    TW_COLOR_TARGETS,
    TW_HUE,
    TW_LUMINOSITY,
    TW_MODIFIERS,
} from "inferred-types/constants";
import {
    getTailwindModifiers,
    isNumberLike,
    isString,
    removeTailwindModifiers,
    retainAfter,
} from "inferred-types/runtime";

/**
 * **isTailwindColor**`(val)`
 *
 * A type guard which validates whether the `val` passed in is a
 * [Tailwind](https://tailwindcss.com/docs/customizing-colors)
 * color (e.g., `blue`, `sky`, `slate`, etc.).
 *
 * **Related:** `isTailwindColor`, `isTailwindColorWithLuminosityAndOpacity`
 */
export function isTailwindColorName(val: unknown): val is TwColor {
    return isString(val) && Object.keys(TW_HUE).includes(val);
}

/**
 * **isTailwindColorWithLuminosity**`(val)`
 *
 * A type guard which validates whether the `val` passed in is a [Tailwind](https://tailwindcss.com/docs/customizing-colors)
 * color with luminosity string (e.g., `blue-300`, `purple-900`).
 *
 * - this also allows the colors `white` and `black` which are mapped to a luminosity level
 * but do not have variant luminosities
 *
 * **Related:** `isTailwindColor`, `isTailwindColorWithLuminosityAndOpacity`
 */
export function isTailwindColorWithLuminosity(val: unknown): val is TwColorWithLuminosity {
    return isString(val) && isTailwindColorName(val.split("-")[0]) && (
        !["white", "black"].includes(val.split("-")[0]) || val.split("-").length === 1
    ) && (
        !val.includes("-") || Object.keys(TW_LUMINOSITY).includes(retainAfter(val, "-"))
    );
}

/**
 * **isTailwindColorWithLuminosityAndOpacity**`(val)`
 *
 * A type guard which validates whether the `val` passed in is a [Tailwind](https://tailwindcss.com/docs/customizing-colors)
 * color string with both **luminosity** and **opacity** expressed (e.g., `blue-300/40`, `purple-900/75`).
 *
 * - this also allows the colors `white` and `black` which are mapped to a luminosity level
 * but do not have variant luminosities
 *
 * **Related:** `isTailwindColor`, `isTailwindColorWithLuminosity`, `isTailwindColorName`
 */
export function isTailwindColorWithLuminosityAndOpacity(val: unknown): val is TwColorWithLuminosityOpacity {
    return isString(val)
        && val.includes("/")
        && isTailwindColorWithLuminosity(val.split("/")[0])
        && isNumberLike(val.split("/")[1])
        && ([1, 2].includes(val.split("/")[1].length) || val.split("/")[1] === "100");
}

/**
 * **isTailwindColor**`(val)`
 *
 * A type guard which validates whether the `val` passed in is a
 * "fully qualified" [Tailwind](https://tailwindcss.com/docs/customizing-colors)
 * color string.
 *
 * - All color string must include a luminosity value except `white` and `black`
 * - You may _optionally_ add an opacity value.
 * - Examples:
 *    - `blue-500`
 *    - `white`
 *    - `black/50`
 *    - `red-700/25`
 *
 * **Related:** `isTailwindColorWithLuminosityAndOpacity`, `isTailwindColorWithLuminosity`, `isTargetedTailwindColor`
 */
export function isTailwindColor(val: unknown): val is TwColorOptionalOpacity {
    return isTailwindColorWithLuminosity(val) || isTailwindColorWithLuminosityAndOpacity(val);
}

/**
 * Type guard which validates that `val` is a `TwModifier` (e.g., "dark", "focus", etc.).
 */
export function isTailwindModifier(val: unknown): val is TwModifier {
    return isString(val) && TW_MODIFIERS.includes(val as any);
}

/**
 * A type guard which validates that `val` is a viable "target" for a Tailwind
 * color string (e.g., "bg", "text", "border", etc.).
 */
export function isTailwindColorTarget(val: unknown): val is TwColorTarget {
    return isString(val) && TW_COLOR_TARGETS.includes(val as any);
}

type FullTailwindColorClass<
    TAllow extends readonly TwModifier[] | readonly [true],
> = TAllow["length"] extends 0
    ? TwTarget__Color
    : TAllow["length"] extends 1
        ? TAllow[0] extends TwModifier
            ? `${Opt<TAllow[0]>}:${TwTarget__Color}`
            : `${Opt<`${string}:`>}${TwTarget__Color__Light}`
        : TAllow["length"] extends 2
            ? TAllow[0] extends TwModifier
                ? TAllow[1] extends TwModifier
                    ? `${TAllow[0]}:${TAllow[1]}:${TwTarget__Color__Light}` |
                `${TAllow[1]}:${TAllow[0]}:${TwTarget__Color__Light}` |
                `${TAllow[0]}:${TwTarget__Color__Light}` |
                `${TAllow[1]}:${TwTarget__Color__Light}` | TwTarget__Color__Light
                    : never
                : never
            : `${Opt<`${string}:`>}${TwTarget__Color}`;

/**
 * A type guard which validates that `val` is a fully qualified Tailwind class which:
 *
 * - targets a valid source (e.g., "bg", "text", etc.)
 * - has a valid color and luminosity (and optionally an opacity)
 * - and if any _modifiers_ were at start of string they are part of the
 * those authorized by the the `allowedModifiers` string
 *
 * **Note:** if `allowedModifiers` is set with a single value of `true` then all known modifiers
 * are allowed.
 *
 * **Related:** `isTailwindColor`, `isTailwindColorTarget`, `isTailwindModifier`
 */
export function isTailwindColorClass<
    TAllow extends readonly TwModifier[] | readonly [true],
>(val: unknown, ...allowedModifiers: TAllow): val is FullTailwindColorClass<TAllow> {
    if (isString(val)) {
        const mods = getTailwindModifiers(val);
        const targetted = removeTailwindModifiers(val);
        const target = targetted.split("-")[0];
        const color = targetted.split("-").slice(1).join("-");

        return isTailwindColorTarget(target)
            && isTailwindColor(color)
            && (
                allowedModifiers[0] === true
                || mods.every(i => (allowedModifiers as TwModifier[]).includes(i))
            );
    }
    return false;
}

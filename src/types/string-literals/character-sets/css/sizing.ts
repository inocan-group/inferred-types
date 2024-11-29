export type SizingUnits =
| `px`
| `em`
| `rem`
| `ch`
| `vh`
| `svh`
| `dvh`
| `lvh`
| `vw`
| `lvw`
| `svw`
| `dvw`
| `fr`;

type VariableSizing =
| `var(${string})${SizingUnits}`
| `var(${string})`
| `calc(${string})${SizingUnits}`
| `calc(${string})`
| `min(${string})${SizingUnits}`
| `min(${string})`
| `max(${string})${SizingUnits}`
| `max(${string})`
| `minmax(${string})${SizingUnits}`
| `minmax(${string})`;


/**
 * A strong type for allowed CSS sizing options.
 *
 * **Related:** `CssSizingLight`
 */
export type CssSizing = `${number}${SizingUnits}` | `${number}%` | VariableSizing;


/**
 * A strong type for allowed CSS sizing options.
 *
 * - unlike `CssSizing` this type doesn't allow `VariableSizing` where a **var(...)** expression
 * is then followed by a sizing unit.
 * - this reduces complexity considerably while fiitting most use cases as you can still have
 * CSS variables like `var(--foobar)` in this type.
 */
export type CssSizingLight = `${number}${SizingUnits}` | `${number}%`;

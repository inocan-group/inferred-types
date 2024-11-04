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
 * provides a string literal which is intended to describe the
 * "size" of any CSS property (whether using static values or
 * CSS variables)
 */
export type CssSizing = `${number}${SizingUnits}` | `${number}%` | VariableSizing;


/**
 * **InlineSvg**`<[T]>`
 *
 * meant to represent a string value that appears to be
 * an inline SVG representation.
 */
export type InlineSvg<T extends string = string> = `<svg${T}</svg>`;

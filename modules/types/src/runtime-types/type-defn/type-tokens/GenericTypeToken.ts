
/**
 * **GenericParamToken**
 *
 * a token representing the `GenericParam` type with a shape of:
 *
 * - `<<generic::{{Name}} extends {{TypeToken}}>>`
 * - or if it has a description, then:
 *     - `<<generic::{{Name}} extends {{TypeToken}}::{{Description}}>>`
 */
export type GenericParamToken = `<<generic::${string}->${string}${"" | `::${string}`}>>`;

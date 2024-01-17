import { CSV, Digit } from "src/types/index";

export type OptModifier = `|opt`;

/**
 * **BespokeLiteral**
 * 
 * A string literal token which has a discrete literal value
 */
export type BespokeLiteral = `literal:${string}`;

/**
 * **BespokeUnion**
 * 
 * A string literal token which represents a discrete set of
 * values who's union represents the string literal value.
 * 
 * Note: if you need a comma literal in your union type then it
 * must be serialized to `Constant<"comma">`.
 */
export type BespokeUnion<T extends Digit = 1> = `union:[${CSV<T>}`;

type OptionalOptModifier = OptModifier | "";

/**
 * **StringLiteralToken**
 * 
 * Tokens are broken up into three types:
 * 
 * 1. **bespoke** literal values can also be specified by prefixing with
 * `literal:` and then the literal value.
 * 2. **union** literal values can be expressed as `union:[CSV]`
 * 3. **known** literals are surrounded by `<` and `>` characters and
 * represent a known type definition which is valid for a string
 * literal.
 * 
 *    - within known literals there are three char "scopes":
 *        - `<string>` effectively allows any number and type of chars
 *        - `<number>` and `<boolean>` allow for as many characters as is required for completing the type
 *        - all others -- like `<digit>`, `<letter>`, etc. -- are just a single character
 *    - known literals can add the `| opt` modifier to become intersected with `| ""` which makes them an optional condition. Note that only `<string>` does _not_ allow this as this optionality provides no additional optionality.
 */
export type StringLiteralToken = BespokeLiteral | "<string>" | `<number${OptionalOptModifier}>` | `<digit${OptionalOptModifier}>` | `<boolean${OptionalOptModifier}>` | `<letter${OptionalOptModifier}>` | `<letter:lowercase${OptionalOptModifier}>` | `<letter:uppercase${OptionalOptModifier}>` | `<bracket${OptionalOptModifier}>` | `<bracket:opening${OptionalOptModifier}>` | `<bracket:closing${OptionalOptModifier}>` | `<whitespace${OptionalOptModifier}>`;

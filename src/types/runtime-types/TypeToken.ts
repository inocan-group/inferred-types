import { CSV } from "src/types";

/**
 * TypeTokens
 * 
 * A union of "type tokens" where a token is a string representation
 * of a type. These string representations fit into the following
 * categories.
 * 
 * All type tokens follow the generic pattern imposed by `GenericTypeToken`.
 */
export type TypeToken = 
  | "<<string>>" 
  | "<<number>>" 
  | "<<numeric-string>>" 
  | "<<null>>"
  | "<<undefined>>"
  | "<<boolean>>" 
  | "<<boolean-string>>" 
  | "<<true>>" 
  | "<<false>>" 
  | "<<space>>"
  | "<<whitespace>>"
  | `<<string-literal:${string}>>`
  | `<<numeric-literal:${number}>>`
  | `<<object-literal:${string}>>`
  | `<<tuple:[${string}]>>`
  | `<<union:[${CSV}]>>`
  | `<<explicitType:${string}>>`
  | `<<startsWith:${string}>>`
  | `<<endsWith:${string}>>`
  | `<<ensureLeading:${string}>>`
  | `<<ensureTrailing:${string}>>`
  | `<<stripLeading:${string}>>`
  | `<<stripTrailing:${string}>>`
  | `<<camelCase:${string}>>`
  | `<<pascalCase:${string}>>`
  | `<<snakeCase:${string}>>`
  | `<<pascalCase:${string}>>`
  | `<<pascalCase:${string}>>`;

export type GenericTypeToken = `<<${string}>>`;

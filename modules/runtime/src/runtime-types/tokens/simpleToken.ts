import type {
  SimpleContainerToken,
  SimpleScalarToken,
  SimpleToken,
  SimpleType,
} from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isSimpleContainerToken, isSimpleScalarToken } from "inferred-types/runtime";

/**
 * **simpleToken**`(token)`
 *
 * Creates a `SimpleToken` which assured to be a valid token type.
 *
 * **Related:** `simpleType()`, `simpleScalarToken()`, `simpleContainerToken()`
 */
export const simpleToken = <T extends SimpleToken>(token: T) => token;

/**
 * **simpleScalarToken**`(token)`
 *
 * Creates a `SimpleScalarToken` which is assured to be a valid token type.
 *
 * **Related:** `simpleType()`, `simpleToken()`, `simpleContainerToken()`
 */
export const simpleScalarToken = <T extends SimpleScalarToken>(token: T) => token;

/**
 * **simpleContainerToken**`(token)`
 *
 * Creates a `SimpleContainerToken` which assured to be a valid token type.
 *
 * **Related:** `simpleType()`, `simpleToken()`, `simpleScalarToken()`
 */
export const simpleContainerToken = <T extends SimpleContainerToken>(token: T) => token;

/**
 * **simpleScalarType**`(token)`
 *
 * Creates a valid runtime token _and_ converts it's type to the type that
 * the token represents.
 *
 * **Related:** `simpleScalarToken`
 */
export function simpleScalarType<T extends SimpleScalarToken>(token: T) {
  const value: unknown = simpleScalarToken(token) as unknown;

  return value as SimpleType<T>;
}

/**
 * **simpleContainerType**`(token)`
 *
 * Creates a valid runtime token _and_ converts it's type to the type that
 * the token represents.
 *
 * **Related:** `simpleContainerToken`
 */
export function simpleContainerType<T extends SimpleContainerToken>(token: T) {
  const value: unknown = simpleContainerToken(token) as unknown;

  return value as SimpleType<T>;
}

/**
 * **simpleType**`(token)`
 *
 * Creates a valid runtime token of the `SimpleToken` convention and converts
 * the _type_ to the type that the token represents.
 */
export function simpleType<T extends SimpleToken>(token: T) {
  const value: unknown = (
    isSimpleScalarToken(token)
      ? simpleScalarType(token)
      : isSimpleContainerToken(token)
        ? simpleContainerToken(token)
        : Never
  );
  return value as SimpleType<T>;
}

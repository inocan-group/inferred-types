import type { AnyFunction, NodeCallback } from "src/base-types";

type Result<T extends NodeCallback> = Parameters<T>["length"] extends 2
    ? Parameters<T>[1]
    : void;

/**
 * **Promisify**`<T>`
 *
 * A better typed **Promisify** type utility.
 *
 * - converts a `NodeCallback` into a promise based async function
 */
export type Promisify<T extends AnyFunction> =
  T extends (...args: [...infer Args, infer Cb extends NodeCallback]) => void
      ? (...args: Args) => Promise<Result<Cb>>
      : never;

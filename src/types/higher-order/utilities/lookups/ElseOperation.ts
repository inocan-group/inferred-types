import { OpHandler } from "src/types/index";

/**
 * **ElseOperation**`<THandler>`
 * 
 * Provides the _type_ for the ELSE parameter in an operation. If the handler
 * for the operation is `use-else` then it will allow any value; otherwise 
 * it returns `never` as ELSE is not a consideration for the operation.
 */
export type ElseOperation<THandler extends OpHandler> = THandler extends "use-else"
  ? unknown
  : never;

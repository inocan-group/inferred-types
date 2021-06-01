/* eslint-disable no-use-before-define */
import { FluentApi } from "~/types";
/**
 * **MakeFluentApi**
 * 
 * Takes a "pure" Fluent API and optionally an Escape API (aka, non-fluent endpoints),
 * and combines the implementation and typing so that they form 
 */
export function MakeFluentApi<TFluent extends FluentApi<any, TEscape, any>, TEscape extends {} = {}>(fluent: TFluent, escape: TEscape) {
  const implementation = { ...fluent, ...escape };

}
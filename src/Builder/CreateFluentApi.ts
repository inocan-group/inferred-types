/* eslint-disable unicorn/consistent-function-scoping */
import { FluentApi } from "~/types";

/**
 * **CreateFluentApi**
 *
 * Accepts a _fluent_ and _escape_ API and merges them to form the full runtime
 * API surface. It then excludes any parts of the API which are excluded by the
 * optional `exclusionPolicy` function.
 */
export function CreateFluentApi<
  TApi extends Record<string, (...args: any[]) => FluentApi<TApi, TEscape, any>>,
  TEscape extends Record<string, any>
>(fluentApi: TApi, escapeApi: TEscape, exclusionPolicy: () => string[] = () => []) {
  const exclusions = exclusionPolicy();
  type Exclusions = keyof typeof exclusions;

  return { ...fluentApi, ...escapeApi } as Omit<TApi & TEscape, Exclusions>;
}

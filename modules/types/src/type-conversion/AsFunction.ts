/**
 * **AsFunction**<TTest, [TParams]>
 *
 * Attempts to narrow `T` to a string type where possible.
 *
 * **Related:** `ToString`
 */
export type AsFunction<
  TTest,
  TParams extends readonly unknown[] = readonly unknown[],
> = TTest & (<TArgs extends TParams>(args: TArgs) => unknown);

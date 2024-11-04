import { AsNumber, AsStringUnion, IsWideType } from "@inferred-types/types"

type Process<
  TContent extends string,
  TSurround extends string
> = TContent extends `${TSurround}${infer REMAIN}`
  ? REMAIN extends `${infer LEADING}${TSurround}`
    ? LEADING
    : REMAIN
  : TContent extends `${infer LEADING}${TSurround}`
    ? LEADING
    : TContent;

/**
 * **StripSurround**`<TContent, TSurround>`
 *
 * Strips the content found in `TSurround` from the leading or trailing
 * edge of the content passed in as `TContent`.
 *
 * ```ts
 * // "Hi there"
 * type Hello = StripSurround<"(Hi there)", "(" | ")">;
 * ```
 */
export type StripSurround<
  TContent extends string | number,
  TSurround extends string | number
> = IsWideType<TContent> extends true
? TContent
: TContent extends string
  ? Process<TContent, AsStringUnion<TSurround>>
  : AsNumber<
      Process<`${TContent}`, AsStringUnion<TSurround>>
    >;

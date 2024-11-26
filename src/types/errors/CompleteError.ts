import {
  Throw,
  PartialError,
  ErrorCondition,
  TypeErrorInfo,
  ExpandRecursively,
  EmptyObject,
  RemoveNever,
  AsString
} from "inferred-types/types"


type Req<
  T extends PartialError
> = RemoveNever<{
  kind: T["kind"] extends string ? never : string;
  message: T["message"] extends string ? never : string;
}>;

type Optional<
  T extends PartialError
> = Partial<ExpandRecursively<
  RemoveNever<{
    library: T["library"] extends string ? never : string;
    utility: T["utility"] extends string ? never : string;
    underlying: T["utility"] extends ErrorCondition ? never : ErrorCondition;
  }> &
  Omit<TypeErrorInfo, "kind" | "message" | "utility" | "library" | "underlying">
>>



/**
 * **CompleteError**`<TPartial, TComplete>`
 *
 * Completes an `ErrorCondition` from the starting point of
 * a pre-existing `TPartial`.
 */
export type CompleteError<
  TPartial extends PartialError,
  TRequired extends Req<TPartial>,
  TOpt extends Optional<TPartial> = EmptyObject
> = Throw<
  TPartial["kind"] extends string
    ? TPartial["kind"]
    : "kind" extends keyof TRequired
      ? AsString<TRequired["kind"]>
      : never
  ,
  TPartial["message"] extends string
  ? TPartial["message"]
  : "message" extends keyof TRequired
    ? AsString<TRequired["message"]>
    : never
  ,
  TPartial["utility"] extends string
    ? TPartial["utility"]
    : "utility" extends keyof TRequired
      ? AsString<TRequired["utility"]>
      : never
  ,
  RemoveNever<{
    underlying: TPartial["underlying"] extends ErrorCondition
      ? TPartial["underlying"]
      : "underlying" extends keyof TOpt
        ? TOpt["underlying"] extends ErrorCondition
          ? TOpt["underlying"]
          : never
        : never;
    library: TPartial["library"] extends string
      ? TPartial["library"]
      : "library" extends keyof TOpt
        ? TOpt["library"] extends string
          ? TOpt["library"]
          : never
        : never;
  }> & Omit<TOpt, "library" | "underlying">
>;



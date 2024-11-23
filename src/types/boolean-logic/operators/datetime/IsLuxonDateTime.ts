import { TypedFunction } from "src/types/index";

/**
* **IsLuxonDateTime`<T>`
*
* A boolean operator which returns `true` when `T` appears to be a Luxon DateTime instance.
*/
export type IsLuxonDateTime<T> = "isValid" extends keyof T
  ? "toISODate" extends keyof T
  ? "toFormat" extends keyof T
  ? "toMillis" extends keyof T
  ? "year" extends keyof T
  ? "month" extends keyof T
  ? "day" extends keyof T
  ? T["isValid"] extends boolean
  ? T["toISODate"] extends TypedFunction
  ? T["toFormat"] extends TypedFunction
  ? T["toMillis"] extends TypedFunction
  ? T["year"] extends number
  ? T["month"] extends number
  ? T["day"] extends number
  ? true
  : false
  : false
  : false
  : false
  : false
  : false
  : false
  : false
  : false
  : false
  : false
  : false
  : false
  : false;

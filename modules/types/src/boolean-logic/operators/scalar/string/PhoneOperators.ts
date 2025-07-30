import type {
    GetPhoneCountryCode,
    IsError,
    IsStringLiteral,
    IsTrue,
    MaybeError,
    PhoneCountryCode,
    PhoneNumber,
} from "inferred-types/types";

// BOOLEAN OPERATORS for PHONE TYPES

/**
 * **IsPhoneNumber**`<T>`
 *
 * Boolean operator which tests whether `T` has a
 * type that supports it being a phone number.
 *
 * **Note:**
 *
 * - this utility relies on the using the `PhoneNumber<T>` validation
 * technique to determine that whether it is a phone number but whereas
 * this utility returns `T` _or_ and `ErrorCode` this produces a boolean
 * outcome.
 *
 * **Related:** `PhoneNumber`, `HasPhoneCountryCode`
 */
export type IsPhoneNumber<T extends string | number> = IsError<PhoneNumber<T>> extends true
    ? false
    : MaybeError<PhoneNumber<T>> extends true
        ? boolean
        : true;

/**
 * **HasPhoneCountryCode**`<T>`
 *
 * Boolean operator which validates whether the passed in `T` has a country code leading it (ignoring any leading
 * whitespace):
 *
 * - by default, the country code is not only parsed out of the phone number but also validated against an world
 * wide index of valid country codes
 * - if you want to just validate that user _attempted_ to express a country code then you can change the check by
 * setting `TExplicit` to **false**.
 *
 * **Related:** `IsPhoneNumber`, `PhoneNumber`
 */
export type HasPhoneCountryCode<
    TPhone,
    TExplicit extends boolean = true,
> = TPhone extends string
    ? IsStringLiteral<TPhone> extends true
        ? IsTrue<TExplicit> extends true
            ? GetPhoneCountryCode<TPhone> extends PhoneCountryCode
                ? true
                : false
            : GetPhoneCountryCode<TPhone> extends ""
                ? false
                : true
        : boolean
    : false;

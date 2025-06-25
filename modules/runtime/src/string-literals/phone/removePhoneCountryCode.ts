import type { RemovePhoneCountryCode } from "inferred-types/types";
import { getPhoneCountryCode, stripLeading } from "inferred-types/runtime";

export function removePhoneCountryCode<
    T extends string,
>(phone: T) {
    const countryCode = getPhoneCountryCode(phone) as unknown as string;
    return (
        countryCode !== ""
            ? stripLeading(stripLeading(
                phone.trim(),
                "+",
                "00",
            ) as string, countryCode).trim()
            : phone.trim()
    ) as unknown as RemovePhoneCountryCode<T>;
}

import type { AsFromTo, FromTo } from "inferred-types/types";

export function asFromTo<
    const T extends Record<string, string>,
>(defn: T) {
    const fromTo: FromTo[] = Object.keys(defn).reduce(
        (acc, from) => {
            return [
                ...acc,
                { from, to: defn[from] },
            ];
        },
        [] as FromTo[],
    );

    return fromTo as unknown as AsFromTo<T>;
}
